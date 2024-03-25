package com.ssafy.idk.domain.piggybank.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.piggybank.domain.PiggyBank;
import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankCreateRequestDto;
import com.ssafy.idk.domain.piggybank.dto.response.PiggyBankCreateResponseDto;
import com.ssafy.idk.domain.piggybank.dto.response.PiggyBankResponseDto;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.piggybank.repository.PiggyBankRepository;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PiggyBankService {

    private final AccountRepository accountRepository;
    private final PiggyBankRepository piggyBankRepository;
    private final AuthenticationService authenticationService;
    private final AccountService accountService;

    public PiggyBankCreateResponseDto createPiggyBank(PiggyBankCreateRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Long accountId = requestDto.getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 저금통 가입 여부 확인
        if (piggyBankRepository.findByAccountId(accountId).isPresent())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_EXISTS);

        // 계좌 잔고 부족 여부 확인
        if (account.getBalance() < requestDto.getDeposit())
            throw new PiggyBankException(ErrorCode.PIGGY_BANK_INSUFFICIENT_ACCOUNT_BALANCE);

        PiggyBank piggyBank = PiggyBank.builder()
                .accountId(accountId)
                .balance(requestDto.getDeposit())
                .build();

        // 계좌 출금
        account.withdraw(requestDto.getDeposit());
        PiggyBank savedPiggyBank = piggyBankRepository.save(piggyBank);

        return PiggyBankCreateResponseDto.of(savedPiggyBank.getPiggyBankId(), savedPiggyBank.getBalance(), account.getBalance());
    }

    public PiggyBankResponseDto getPiggyBank(Long accountId) {

        PiggyBank piggyBank = piggyBankRepository.findByAccountId(accountId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        return PiggyBankResponseDto.of(piggyBank.getPiggyBankId(), accountId, piggyBank.getName(), piggyBank.getBalance());
    }

}
