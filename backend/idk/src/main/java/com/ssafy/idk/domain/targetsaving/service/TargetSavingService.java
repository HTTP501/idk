package com.ssafy.idk.domain.targetsaving.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.targetsaving.dto.request.TargetSavingCreateRequestDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingCreateResponseDto;
import com.ssafy.idk.domain.targetsaving.dto.response.TargetSavingDeleteResponseDto;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import com.ssafy.idk.domain.targetsaving.exception.TargetSavingException;
import com.ssafy.idk.domain.targetsaving.repository.TargetSavingRepository;
import com.ssafy.idk.global.error.ErrorCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TargetSavingService {

    private final AuthenticationService authenticationService;
    private final TargetSavingRepository targetSavingRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public TargetSavingCreateResponseDto createTargetSaving(TargetSavingCreateRequestDto requestDto) {

        Member member = authenticationService.getMemberByAuthentication();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Long accountId = requestDto.getAccountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.ACCOUNT_NOT_FOUND));
        if (member != account.getMember())
            throw new TargetSavingException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // date 유효성 검증 (1일 ~ 31일)
        if (requestDto.getDate() < 1 || requestDto.getDate() > 31)
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INVALID_DATE);

        // 저축개월 최대 1 ~ 36개월
        if (requestDto.getTerm() < 1 || requestDto.getTerm() > 36)
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INVALID_TERM);

        // 목표저축 금액과 월 납입액 * 저축개월 일치 여부 확인
        if (requestDto.getGoalAmount() != requestDto.getMonthlyAmount() * requestDto.getTerm())
            throw new TargetSavingException(ErrorCode.TARGET_SAVING_INCORRECT_AMOUNT);

        TargetSaving targetSaving = TargetSaving.builder()
                .name(requestDto.getName())
                .date(requestDto.getDate())
                .term(requestDto.getTerm())
                .monthlyAmount(requestDto.getMonthlyAmount())
                .goalAmount(requestDto.getGoalAmount())
                .itemId(requestDto.getItemId())
                .createAt(LocalDateTime.now())
                .account(account)
                .build();

        TargetSaving savedTargetSaving = targetSavingRepository.save(targetSaving);

        return TargetSavingCreateResponseDto.of(
                savedTargetSaving.getTargetSavingId(),
                savedTargetSaving.getName(),
                savedTargetSaving.getDate(),
                savedTargetSaving.getTerm(),
                savedTargetSaving.getMonthlyAmount(),
                savedTargetSaving.getGoalAmount()
                );
    }

    @Transactional
    public TargetSavingDeleteResponseDto deleteTargetSaving(Long targetSavingId) {

        Member member = authenticationService.getMemberByAuthentication();

        TargetSaving targetSaving = targetSavingRepository.findById(targetSavingId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.TARGET_SAVING_NOT_FOUND));

        Account account = targetSaving.getAccount();

        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        if (member != account.getMember())
            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        // 돈 포켓 기능 구현 후 잔고 업데이트 구현 필요
        
        targetSavingRepository.deleteById(targetSavingId);

        return TargetSavingDeleteResponseDto.of(account.getBalance());
    }
}
