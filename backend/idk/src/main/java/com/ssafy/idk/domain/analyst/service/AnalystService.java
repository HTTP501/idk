package com.ssafy.idk.domain.Analyst.service;

import com.ssafy.idk.domain.Analyst.domain.Analyst;

import com.ssafy.idk.domain.Analyst.dto.AnalystAllAmountResponse;
import com.ssafy.idk.domain.Analyst.dto.AnalystAllAmountResponse.AnalystAllAmount;
import com.ssafy.idk.domain.Analyst.dto.AnalystCurrentMonthAmoutnResponse;
import com.ssafy.idk.domain.Analyst.dto.AnalystMonthAmountResponse;
import com.ssafy.idk.domain.Analyst.exception.AnalystException;
import com.ssafy.idk.domain.Analyst.repository.AnalystRepository;
import com.ssafy.idk.domain.member.domain.Member;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalystService {

    private final AuthenticationService authenticationService;
    private final AnalystRepository analystRepository;

    // 총, 카드, 공과금, 일반 지출 조회
    public AnalystAllAmountResponse getAmount(String type) {

        Member member = authenticationService.getMemberByAuthentication();
        List<Analyst> analysts = analystRepository.findAllByMember(member);
        List<AnalystAllAmount> amountList = new ArrayList<>();

        for (Analyst analyst : analysts) {
            if ("total".equals(type)) {
                amountList.add(new AnalystAllAmount(analyst.getYear(), analyst.getMonth(), analyst.getTotalAmount()));
            } else if ("card".equals(type)) {
                amountList.add(new AnalystAllAmount(analyst.getYear(), analyst.getMonth(), analyst.getFixedMyDataCardAmount()));
            } else if ("utility".equals(type)) {
                amountList.add(new AnalystAllAmount(analyst.getYear(), analyst.getMonth(), analyst.getFixedUtilityAmount()));
            } else if ("common".equals(type)) {
                amountList.add(new AnalystAllAmount(analyst.getYear(), analyst.getMonth(), analyst.getTotalCommonAmount()));
            } else {
                throw new AnalystException(ErrorCode.ANALYST_NOT_MATCHED_TYPE);
            }
        }
        return AnalystAllAmountResponse.of(amountList);
    }

    // 특정 월 지출 조회
    public AnalystMonthAmountResponse getMonthAmount(Integer year, Integer month) {

        Member member = authenticationService.getMemberByAuthentication();
        Analyst analyst = analystRepository.findByMemberAndYearAndMonth(member, year, month)
                .orElseThrow(()-> new AnalystException(ErrorCode.ANALYST_NOT_FOUND));

        return AnalystMonthAmountResponse.of(analyst);
    }

    // 이번 달 지출 조회 (미완)
    public AnalystCurrentMonthAmoutnResponse getCurrentMonthAmount() {

        Member member = authenticationService.getMemberByAuthentication();

        return AnalystCurrentMonthAmoutnResponse.of();
    }

    // 매달 1일 자정에 이전 달 지출 정보 저장 (미완)
    public void saveDataForNewMonth() {

        Member member = authenticationService.getMemberByAuthentication();
    }
}
