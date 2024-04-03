package com.ssafy.idk.domain.piggybank.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.entity.Category;
import com.ssafy.idk.domain.account.entity.Transaction;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.piggybank.entity.PiggyBank;
import com.ssafy.idk.domain.piggybank.entity.PiggyBankTransaction;
import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankCreateRequestDto;
import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankTransactionRequestDto;
import com.ssafy.idk.domain.piggybank.dto.response.*;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.piggybank.repository.PiggyBankRepository;
import com.ssafy.idk.domain.piggybank.repository.PiggyBankTranscationRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PiggyBankService {

    private final AccountRepository accountRepository;
    private final PiggyBankRepository piggyBankRepository;
    private final PiggyBankTranscationRepository piggyBankTransactionRepository;
    private final AuthenticationService authenticationService;
    private final TransactionRepository transactionRepository;

    @Transactional
    public PiggyBankCreateResponseDto createPiggyBank(PiggyBankCreateRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Long accountId = requestDto.getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 저금통 가입 여부 확인
        if (piggyBankRepository.findByAccount(account).isPresent())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_EXISTS);

        // 계좌 잔고 부족 여부 확인
        if (account.getBalance() < requestDto.getDeposit())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_INSUFFICIENT_ACCOUNT_BALANCE);

        PiggyBank piggyBank = PiggyBank.builder()
                .account(account)
                .balance(requestDto.getDeposit())
                .build();

        // 계좌 출금
        account.withdraw(requestDto.getDeposit());
        PiggyBank savedPiggyBank = piggyBankRepository.save(piggyBank);

        return PiggyBankCreateResponseDto.of(savedPiggyBank.getPiggyBankId(), savedPiggyBank.getBalance(), account.getBalance());
    }

    public PiggyBankResponseDto getPiggyBank() {

        Member member = authenticationService.getMemberByAuthentication();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        PiggyBank piggyBank = piggyBankRepository.findByAccount(account)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        return PiggyBankResponseDto.of(piggyBank.getPiggyBankId(), piggyBank.getAccount().getAccountId(), piggyBank.getBalance());
    }

    @Transactional
    public PiggyBankDeleteResponseDto deletePiggyBank(Long piggyBankId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 저금통 유무 확인
        PiggyBank piggyBank = piggyBankRepository.findByPiggyBankId(piggyBankId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        Account account = piggyBank.getAccount();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 입금 : 저금통 잔고 -> 계좌
        account.deposit(piggyBank.getBalance());

        // 저금통 해지
        piggyBankRepository.deleteById(piggyBankId);

        return PiggyBankDeleteResponseDto.of(account.getBalance());
    }

    public PiggyBankDetailResponseDto getDetailPiggyBank(Long piggyBankId) {

        Member member = authenticationService.getMemberByAuthentication();

        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.ACCOUNT_NOT_FOUND));

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 저금통 유무 확인
        PiggyBank piggyBank = piggyBankRepository.findByPiggyBankId(piggyBankId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        return PiggyBankDetailResponseDto.of(
                piggyBank.getPiggyBankId(),
                account.getAccountId(),
                piggyBank.getBalance(),
                arrayPiggyBankTransaction(piggyBankId)
        );
    }

    public List<PiggyBankTransactionResponseDto> arrayPiggyBankTransaction(Long piggyBankId) {

        // 저금통 입출금 내역 조회
        List<PiggyBankTransaction> arrayPiggyBankTransaction = piggyBankTransactionRepository.findByPiggyBank(
                piggyBankRepository.findByPiggyBankId(piggyBankId)
                        .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND)));

        // 배열 생성
        List<PiggyBankTransactionResponseDto> arrayTransactionResponseDto = new ArrayList<>();
        for (PiggyBankTransaction transaction : arrayPiggyBankTransaction) {
            arrayTransactionResponseDto.add(
                    PiggyBankTransactionResponseDto.of(
                            transaction.getPiggyBankTransactionId(),
                            transaction.getAmount(),
                            transaction.getBalance(),
                            transaction.getContent(),
                            transaction.getCreatedAt()
                    ));
        }

        return arrayTransactionResponseDto;
    }

    @Transactional
    public PiggyBankArrayTransactionResponseDto deposit(PiggyBankTransactionRequestDto requestDto, Long piggyBankId) {

        // 저금통 유무 확인
        PiggyBank piggyBank = piggyBankRepository.findByPiggyBankId(piggyBankId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        Account account = piggyBank.getAccount();

        // 계좌 잔고에서 입금 금액만큼 출금할 수 있는지 확인
        if (account.getBalance() < requestDto.getAmount())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_INSUFFICIENT_ACCOUNT_BALANCE);

        // 계좌 출금
        account.withdraw(requestDto.getAmount());
        accountRepository.save(account);

        // 계좌 입출금 내역 저장
        Transaction transaction = Transaction.builder()
                .category(Category.저금통)
                .content("저금통으로 출금")
                .amount(requestDto.getAmount())
                .balance(account.getBalance())
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();
        transactionRepository.save(transaction);

        // 저금통 입금
        piggyBank.deposit(requestDto.getAmount());
        piggyBankRepository.save(piggyBank);

        // 저금통 입출금 내역 저장
        PiggyBankTransaction piggyBankTransaction = PiggyBankTransaction.builder()
                .piggyBank(piggyBank)
                .createdAt(LocalDateTime.now())
                .amount(requestDto.getAmount())
                .balance(piggyBank.getBalance())
                .content("입금")
                .build();
        piggyBankTransactionRepository.save(piggyBankTransaction);

        return PiggyBankArrayTransactionResponseDto.of(
                arrayPiggyBankTransaction(piggyBank.getPiggyBankId())
        );
    }

    public PiggyBankArrayTransactionResponseDto withdraw(PiggyBankTransactionRequestDto requestDto, Long piggyBankId) {

        Member member = authenticationService.getMemberByAuthentication();

        // 저금통 유무 확인
        PiggyBank piggyBank = piggyBankRepository.findByPiggyBankId(piggyBankId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        Account account = piggyBank.getAccount();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 저금통에서 출금 금액만큼 출금할 수 있는지 확인
        if (piggyBank.getBalance() < requestDto.getAmount())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_INSUFFICIENT_BALANCE);

        // 저금통 출금
        piggyBank.withdraw(requestDto.getAmount());
        piggyBankRepository.save(piggyBank);

        // 저금통 입출금 내역 저장
        PiggyBankTransaction piggyBankTransaction = PiggyBankTransaction.builder()
                .piggyBank(piggyBank)
                .createdAt(LocalDateTime.now())
                .amount(requestDto.getAmount())
                .balance(piggyBank.getBalance())
                .content("출금")
                .build();
        piggyBankTransactionRepository.save(piggyBankTransaction);

        // 계좌 입금
        account.deposit(requestDto.getAmount());
        accountRepository.save(account);

        // 계좌 입출금 내역 저장
        Transaction transaction = Transaction.builder()
                .category(Category.저금통)
                .content("저금통에서 입금")
                .amount(requestDto.getAmount())
                .balance(account.getBalance())
                .createdAt(LocalDateTime.now())
                .account(account)
                .build();
        transactionRepository.save(transaction);

        return PiggyBankArrayTransactionResponseDto.of(
                arrayPiggyBankTransaction(piggyBank.getPiggyBankId())
        );
    }
}
