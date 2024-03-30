package com.ssafy.idk.domain.autodebit.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AutoDebitService {

    private final AccountRepository accountRepository;

    @Transactional
    public void createAutoDebit(AutoDebitCreateRequestDto requestDto) {

        // 계좌 번호 검증
        Account account = accountRepository.findByNumber(requestDto.getAccountNumber())
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        // 기관 코드 검증



    }
}
