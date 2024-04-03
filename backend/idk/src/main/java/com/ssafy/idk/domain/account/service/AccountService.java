package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.dto.response.ReadyTransferResponseDto;
import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.dto.request.*;
import com.ssafy.idk.domain.account.dto.response.AccountCreateResponseDto;
import com.ssafy.idk.domain.account.dto.response.AccountResponseDto;
import com.ssafy.idk.domain.account.dto.response.TransferResponseDto;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.exception.TransferException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.client.service.ClientBankService;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.exception.MemberException;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.pocket.service.PocketService;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.PasswordEncryptUtil;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncryptUtil passwordEncryptUtil;
    private final RSAKeyService rsaKeyService;
    private final TransactionService transactionService;
    private final AuthenticationService authenticationService;
    private final PocketService pocketService;
    private final ClientBankService clientBankService;

    @Transactional
    public AccountCreateResponseDto createAccount(AccountCreateRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        if(accountRepository.findByMember(member).isPresent()) throw new AccountException(ErrorCode.ACCOUNT_EXISTS);

        // RSAKey 생성
        HashMap<String, String> keyPair = RSAUtil.generateKeyPair();
        String publicKey = keyPair.get("publicKey");
        String privateKey = keyPair.get("privateKey");

        rsaKeyService.saveRSAKey(member.getMemberId(), privateKey);

        // 계좌번호 생성
        String accountNumber = generateAccountNumber();

        Account account = Account.builder()
                .number(RSAUtil.encode(publicKey,accountNumber))
                .password(passwordEncryptUtil.encrypt(requestDto.getAccountPassword()))
                .name(requestDto.getAccountName())
                .payDate(requestDto.getAccountPayDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .member(member)
                .build();

        Account savedAccount = accountRepository.save(account);
        updateAccount(member.getMemberId());
        return AccountCreateResponseDto.of(RSAUtil.decode(privateKey, savedAccount.getNumber()), savedAccount.getCreatedAt());
    }

    public String generateAccountNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        sb.append("501"); // 은행 식별 번호
        sb.append("10"); // 계좌 유형 번호 (10은 예금)

        // 고객 계좌 식별 번호 (랜덤 생성)
        for(int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }
        
        // 검증용 숫자 계산
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9, 2, 3};
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (sb.charAt(i) - '0') * weights[i];
        }
        int checksum = (11 - (sum % 11)) % 10;
        sb.append(checksum);
        return sb.toString();
    }

    public AccountResponseDto getAccount() {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        return AccountResponseDto.of(account.getAccountId(), member.getName(), RSAUtil.decode(privateKey, account.getNumber()), account.getName(), account.getBalance(), account.getMinAmount(), account.getPayDate());
    }

    @Transactional
    public void deleteAccount() {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        rsaKeyService.deleteRSAKey(member.getMemberId());
        accountRepository.deleteById(account.getAccountId());
    }

    @Transactional
    public void updateName(AccountNameRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updateName(requestDto.getAccountName());

        updateAccount(member.getMemberId());
    }

    public void verityPwd(AccountPwdRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(!account.getPassword().equals(passwordEncryptUtil.encrypt(requestDto.getPassword()))) {
            throw new AccountException(ErrorCode.ACCOUNT_PWD_NOT_SAME);
        }
    }

    @Transactional
    public void updatePwd(AccountPwdRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updatePassword(passwordEncryptUtil.encrypt(requestDto.getPassword()));

        updateAccount(member.getMemberId());
    }

    @Transactional
    public void updatePayDate(int day) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updatePayDate(day);

        updateAccount(member.getMemberId());
    }

    @Transactional
    public void updateMinAmount(AmountRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(requestDto.getAmount() < 0) throw new AccountException(ErrorCode.ACCOUNT_MIN_AMOUNT_MINUS);
        account.updateMinAmount(requestDto.getAmount());

        updateAccount(member.getMemberId());
    }

    @Transactional
    public void updateAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updateTime();
    }

    public ReadyTransferResponseDto readyTransfer(ReadyTransferRequestDto requestDto) {
        if (requestDto.getBankName().equals("IDK은행")) {
            List<Member> memberList = memberRepository.findAll();
            for(Member member : memberList) {
                Optional<Account> account = accountRepository.findByMember(member);
                if(account.isEmpty()) continue;
                // 개인키로 계좌번호 복호화
                String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
                String accountNumber = RSAUtil.decode(privateKey, account.get().getNumber());
                // 이체할 사용자를 찾았을 경우
                if(accountNumber.equals(requestDto.getAccountNumber())) {
                    return ReadyTransferResponseDto.of(member.getMemberId(), member.getName());
                }
            }
        } else { // 마이데이터 조회
            String senderName = clientBankService.getAccountInfo(requestDto.getBankName(), requestDto.getAccountNumber());
            return ReadyTransferResponseDto.of(null, senderName);
        }
        // 해당 은행에 해당 유저가 없는 경우
        throw new TransferException(ErrorCode.TRANSFER_USER_NOT_FOUND);
    }

    @Transactional
    public TransferResponseDto transfer(TransferRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();

        if (requestDto.getTransferBank().equals("IDK은행")) { // 받는사람이 IDK은행인 경우
            if(!accountNumberVerity(requestDto.getReceiverId()))
                throw new AccountException(ErrorCode.TRANSFER_RECEIVER_FAIL);
            
            // 받는사람 입금
            Account receiveAccount = deposit(requestDto.getReceiverId(), requestDto.getTransferAmount());
            Transaction transaction = Transaction.builder()
                    .category(Category.입금)
                    .content(requestDto.getReceiverPaymentContent())
                    .amount(requestDto.getTransferAmount())
                    .balance(receiveAccount.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(receiveAccount)
                    .build();
            transactionService.saveTransaction(transaction);
        }
        
        // 보낸사람 출금
        Account savedAccount = withdraw(member.getMemberId(), requestDto.getTransferAmount());
        Transaction transaction = Transaction.builder()
                .category(Category.출금)
                .content(requestDto.getMyPaymentContent())
                .amount(requestDto.getTransferAmount())
                .balance(savedAccount.getBalance())
                .createdAt(LocalDateTime.now())
                .account(savedAccount)
                .build();
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        return TransferResponseDto.of(savedTransaction.getAmount(), savedTransaction.getBalance());
    }

    @Transactional
    public Account autoTransfer(AutoTransferRequestDto requestDto) {

        Account account = accountRepository.findById(requestDto.getAccountId())
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if (requestDto.getTransferBank().equals("IDK은행")) { // 받는사람이 IDK은행인 경우
            if(!accountNumberVerity(requestDto.getReceiverId()))
                throw new AccountException(ErrorCode.TRANSFER_RECEIVER_FAIL);

            // 받는사람 입금
            Account receiveAccount = deposit(requestDto.getReceiverId(), requestDto.getTransferAmount());
            Transaction transaction = Transaction.builder()
                    .category(Category.입금)
                    .content(requestDto.getReceiverPaymentContent())
                    .amount(requestDto.getTransferAmount())
                    .balance(receiveAccount.getBalance())
                    .createdAt(LocalDateTime.now())
                    .account(receiveAccount)
                    .build();
            transactionService.saveTransaction(transaction);
        }

        // 보낸사람 출금
        Account savedAccount = withdraw(account.getMember().getMemberId(), requestDto.getTransferAmount());
        Transaction transaction = Transaction.builder()
                .category(Category.출금)
                .content(requestDto.getMyPaymentContent())
                .amount(requestDto.getTransferAmount())
                .balance(savedAccount.getBalance())
                .createdAt(LocalDateTime.now())
                .account(savedAccount)
                .build();
        transactionService.saveTransaction(transaction);

        return savedAccount;
    }

    public boolean accountNumberVerity(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        // 계좌번호 복호화
        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());
        String accountNumber = RSAUtil.decode(privateKey, account.getNumber());

        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9, 2, 3};
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (accountNumber.charAt(i) - '0') * weights[i];
        }
        int checksum = (11 - (sum % 11)) % 10;
        return checksum == Integer.parseInt(String.valueOf(accountNumber.charAt(11)));
    }

    @Transactional
    public void atmDeposit(AmountRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account savedAccount = deposit(member.getMemberId(), requestDto.getAmount());

        Transaction transaction = Transaction.builder()
                .category(Category.입금)
                .content(member.getName())
                .amount(requestDto.getAmount())
                .balance(savedAccount.getBalance())
                .createdAt(LocalDateTime.now())
                .account(savedAccount)
                .build();
        transactionService.saveTransaction(transaction);
    }

    @Transactional
    public void atmWithdraw(AmountRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account savedAccount = withdraw(member.getMemberId(), requestDto.getAmount());

        Transaction transaction = Transaction.builder()
                .category(Category.출금)
                .content(member.getName())
                .amount(requestDto.getAmount())
                .balance(savedAccount.getBalance())
                .createdAt(LocalDateTime.now())
                .account(savedAccount)
                .build();
        transactionService.saveTransaction(transaction);
    }

    @Transactional
    public Account withdraw(Long memberId, Long amount) { // 출금
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(account.getBalance()-account.getMinAmount() < amount) throw new AccountException(ErrorCode.ACCOUNT_BALANCE_LACK);

        account.withdraw(amount);
        return account;
    }

    @Transactional
    public Account deposit(Long memberId, Long amount) { // 입금
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(ErrorCode.MEMBER_NOT_FOUND));
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.deposit(amount);
        Account savedAccount = accountRepository.save(account);

        // 돈 포켓 출금
        if (savedAccount.getMinAmount() < savedAccount.getBalance()) {
            pocketService.pocketAutoDeposit(member, savedAccount);
        }

        return account;
    }
}
