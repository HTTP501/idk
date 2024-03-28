package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.dto.request.*;
import com.ssafy.idk.domain.account.dto.response.AccountCreateResponseDto;
import com.ssafy.idk.domain.account.dto.response.AccountResponseDto;
import com.ssafy.idk.domain.account.dto.response.TransferResponseDto;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.global.error.ErrorCode;
import com.ssafy.idk.global.util.PasswordEncryptUtil;
import com.ssafy.idk.global.util.RSAUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncryptUtil passwordEncryptUtil;
    private final RSAKeyService rsaKeyService;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;

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

        Account account = Account.builder()
                .number(RSAUtil.encode(publicKey,"1234567891010"))
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

    public AccountResponseDto getAccount() {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        String privateKey = rsaKeyService.findPrivateKey(member.getMemberId());

        // amountAvailableAmount 추후 수정(balance-돈포켓)
        return AccountResponseDto.of(account.getAccountId(), RSAUtil.decode(privateKey, account.getNumber()), account.getName(), account.getBalance(), account.getMinAmount(), account.getBalance(), account.getPayDate());
    }

    @Transactional
    public void deleteAccount() {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

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

    @Transactional
    public TransferResponseDto transfer(TransferRequestDto requestDto) {
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if (requestDto.getTransferBank().equals("IDK은행")) { // 받는사람 입금

        }

        Account savedAccount = withdraw(requestDto.getTransferAmount());
        Transaction transaction = Transaction.builder()
                .category(Category.송금)
                .content(requestDto.getMyPaymentContent())
                .amount(requestDto.getTransferAmount())
                .balance(savedAccount.getBalance())
                .createdAt(LocalDateTime.now())
                .account(savedAccount)
                .build();
        Transaction savedTransaction = transactionRepository.save(transaction);

        return TransferResponseDto.of(savedTransaction.getAmount(), savedTransaction.getBalance());
    }

    @Transactional
    public Account withdraw(Long amount) { // 출금
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(account.getBalance()-account.getMinAmount() < amount) throw new AccountException(ErrorCode.ACCOUNT_BALANCE_LACK);

        account.withdraw(amount);
        return account;
    }

    @Transactional
    public Account deposit(Long amount) { // 입금
        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.deposit(amount);
        return account;
    }

    @Transactional
    public Account withdrawTest(Long memberId, Long amount) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMemberWithPessimisticLock(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(account.getBalance()-amount < 0) throw new AccountException(ErrorCode.ACCOUNT_BALANCE_LACK);
        account.withdraw(amount);
        return account;
    }
}
