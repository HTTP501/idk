package com.ssafy.idk.domain.piggybank.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.piggybank.domain.PiggyBank;
import com.ssafy.idk.domain.piggybank.dto.PiggyBankResponseDto;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.piggybank.repository.PiggyBankRepository;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PiggyBankService {

    private final AccountRepository accountRepository;
    private final PiggyBankRepository piggyBankRepository;

    public PiggyBankResponseDto getPiggyBank(Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        PiggyBank piggyBank = piggyBankRepository.findByAccountId(accountId)
                .orElseThrow(() -> new PiggyBankException(ErrorCode.PIGGY_BANK_NOT_FOUND));

        return PiggyBankResponseDto.of(piggyBank.getPiggyBankId(), accountId);
    }


}
