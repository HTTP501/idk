package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.dto.request.AccountCreateRequestDto;
import com.ssafy.idk.domain.account.dto.response.AccountBalanceResponseDto;
import com.ssafy.idk.domain.account.dto.response.AccountCreateResponseDto;
import com.ssafy.idk.domain.account.dto.response.AccountResponseDto;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public AccountCreateResponseDto createAccount(AccountCreateRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = Account.builder()
                .password(requestDto.getAccountPassword())
                .name(requestDto.getAccountName())
                .payDate(requestDto.getAccountPayDate())
                .createdAt(LocalDateTime.now())
                .build();

        Account savedAccount = accountRepository.save(account);

        return AccountCreateResponseDto.of(savedAccount.getNumber(), savedAccount.getCreatedAt());
    }

    public AccountResponseDto getAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        return AccountResponseDto.of(account.getAccountId(), account.getNumber(), account.getName(), account.getBalance(), account.getMinAmount(), account.getPayDate());
    }
    public AccountBalanceResponseDto getAccountBalance(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
        
        // amountAvailableAmount 추후 수정(balance-돈포켓)
        return AccountBalanceResponseDto.of(account.getAccountId(), account.getName(), account.getNumber(), account.getBalance());
    }
}
