package com.ssafy.idk.domain.account.service;

import com.ssafy.idk.domain.account.domain.Account;
import com.ssafy.idk.domain.account.dto.request.AccountCreateRequestDto;
import com.ssafy.idk.domain.account.dto.request.AccountAmountRequestDto;
import com.ssafy.idk.domain.account.dto.request.AccountNameRequestDto;
import com.ssafy.idk.domain.account.dto.request.AccountPwdRequestDto;
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
                .number("1234567891010")
                .password(requestDto.getAccountPassword())
                .name(requestDto.getAccountName())
                .payDate(requestDto.getAccountPayDate())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .member(member)
                .build();

        Account savedAccount = accountRepository.save(account);
        updateAccount(memberId);
        return AccountCreateResponseDto.of(savedAccount.getNumber(), savedAccount.getCreatedAt());
    }

    public AccountResponseDto getAccount(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        // amountAvailableAmount 추후 수정(balance-돈포켓)
        return AccountResponseDto.of(account.getAccountId(), account.getNumber(), account.getName(), account.getBalance(), account.getMinAmount(), account.getBalance(), account.getPayDate());
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

        if(!account.getPassword().equals(requestDto.getPassword())) {
            throw new AccountException(ErrorCode.ACCOUNT_PWD_NOT_SAME);
        }
    }

    @Transactional
    public void updatePwd(AccountPwdRequestDto requestDto, Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        Account account = accountRepository.findByMember(member)
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));

        account.updatePassword(requestDto.getPassword());

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
}
