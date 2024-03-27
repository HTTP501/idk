package com.ssafy.idk.domain.pocket.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.account.exception.AccountException;
import com.ssafy.idk.domain.account.repository.AccountRepository;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.domain.piggybank.exception.PiggyBankException;
import com.ssafy.idk.domain.pocket.dto.request.PocketCreateTargetSavingRequestDto;
import com.ssafy.idk.domain.pocket.dto.response.PocketTargetSavingCreateResponseDto;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import com.ssafy.idk.domain.targetsaving.exception.TargetSavingException;
import com.ssafy.idk.domain.targetsaving.repository.TargetSavingRepository;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PocketService {

    private final PocketRepository pocketRepository;
    private final AccountRepository accountRepository;
    private final TargetSavingRepository targetSavingRepository;
    private final AuthenticationService authenticationService;

    public void createByTargetSaving(Long targetSavingId) {

        Member member = authenticationService.getMemberByAuthentication();
//
//        // 목표저축 유무 확인
        TargetSaving targetSaving = targetSavingRepository.findById(targetSavingId)
                .orElseThrow(() -> new TargetSavingException(ErrorCode.TARGET_SAVING_NOT_FOUND));
//
//        // API 요청 사용자 및 계좌 사용자 일치 여부 확인
        Account account = accountRepository.findById(targetSaving.getAccount().getAccountId())
                .orElseThrow(() -> new AccountException(ErrorCode.ACCOUNT_NOT_FOUND));
//        if (member != account.getMember())
//            throw new PiggyBankException(ErrorCode.COMMON_MEMBER_NOT_CORRECT);

        System.out.println("TargetSaving: " + targetSaving.toString());
        System.out.println("Account: " + account.toString());

        Pocket pocket = Pocket.builder()
                .account(account)
                .targetSaving(targetSaving)
                .name(targetSaving.getName() + "의 돈포켓")
                .target(targetSaving.getMonthlyAmount())
                .isActivated(false)
                .isDeposited(false)
                .isPaid(false)
                .orderNumber(account.getArrayPocketOrders().size())
                .build();

        System.out.println("pocket : " + pocket.toString());
        pocketRepository.save(pocket);

    }
}
