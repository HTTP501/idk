package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.domain.Category;
import com.ssafy.idk.domain.account.domain.Transaction;
import com.ssafy.idk.domain.account.dto.request.*;
import com.ssafy.idk.domain.account.dto.response.AccountCreateResponseDto;
import com.ssafy.idk.domain.account.dto.response.AccountResponseDto;
import com.ssafy.idk.domain.account.dto.response.TransferResponseDto;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
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

    @Transactional
    public AccountCreateResponseDto createAccount(AccountCreateRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();

        // RSAKey 생성
        HashMap<String, String> keyPair = RSAUtil.generateKeyPair();
        String publicKey = keyPair.get("publicKey");
        String privateKey = keyPair.get("privateKey");

        rsaKeyService.saveRSAKey(member.getMemberId(), privateKey);

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
        updateAccount(memberId);
        return AccountCreateResponseDto.of(RSAUtil.decode(privateKey, savedAccount.getNumber()), savedAccount.getCreatedAt());
    }

    public AccountResponseDto getAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        System.out.println("111111");
        String privateKey = rsaKeyService.findPrivateKey(memberId);
        System.out.println("22222");
        // amountAvailableAmount 추후 수정(balance-돈포켓)
        return AccountResponseDto.of(account.getAccountId(), RSAUtil.decode(privateKey, account.getNumber()), account.getName(), account.getBalance(), account.getMinAmount(), account.getBalance(), account.getPayDate());
    }

    @Transactional
    public void deleteAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        accountRepository.deleteById(account.getAccountId());
    }

    @Transactional
    public void updateName(AccountNameRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updateName(requestDto.getAccountName());

        updateAccount(memberId);
    }

    public void verityPwd(AccountPwdRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(!account.getPassword().equals(passwordEncryptUtil.encrypt(requestDto.getPassword()))) {
            throw new AccountException(ErrorCode.ACCOUNT_PWD_NOT_SAME);
        }
    }

    @Transactional
    public void updatePwd(AccountPwdRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updatePassword(passwordEncryptUtil.encrypt(requestDto.getPassword()));

        updateAccount(memberId);
    }

    @Transactional
    public void updatePayDate(int day, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updatePayDate(day);

        updateAccount(memberId);
    }

    @Transactional
    public void updateMinAmount(AccountAmountRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updateMinAmount(requestDto.getAmount());

        updateAccount(memberId);
    }

    @Transactional
    public void updateAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updateTime();
    }

    @Transactional
    public TransferResponseDto transfer(TransferRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();

        if (requestDto.getTransferBank().equals("IDK은행")) { // 받는사람 입금
            
        }

        Account account = withdraw(memberId, requestDto.getTransferAmount());
        Transaction transaction = Transaction.builder()
                .category(Category.송금)
                .content(requestDto.getMyPaymentContent())
                .amount(requestDto.getTransferAmount())
                .balance(account.getBalance())
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();
        Transaction savedTransaction = transactionRepository.save(transaction);

        return TransferResponseDto.of(savedTransaction.getAmount(), savedTransaction.getBalance());
    }

    @Transactional
    public Account withdraw(Long memberId, Long amount) { // 출금
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(account.getBalance()-amount < 0) throw new AccountException(ErrorCode.ACCOUNT_BALANCE_LACK);

        account.withdraw(amount);
        return account;
    }


    @Transactional
    public Account deposit(Long memberId, Long amount) { // 입금
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.deposit(amount);
        return account;
    }
}
