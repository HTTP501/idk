package com.ssafy.idk.domain.analyst.controller;

import com.ssafy.idk.domain.analyst.service.AnalystService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/analyst")
@Slf4j
public class AnalystController {

    private final AnalystService analystService;


    @Operation(summary = "총 지출 조회")
    @GetMapping("/total")
    public ResponseEntity<ResultResponse> getTotalAmount() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_TOTAL_AMOUNT_SUCCESS, analystService.getAmount("total")));
    }

    @Operation(summary = "카드 지출 조회")
    @GetMapping("/card")
    public ResponseEntity<ResultResponse> getCardAmount() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_CARD_AMOUNT_SUCCESS, analystService.getAmount("card")));
    }

    @Operation(summary = "공과금 지출 조회")
    @GetMapping("/utility")
    public ResponseEntity<ResultResponse> getUtilityAmount() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_UTILITY_AMOUNT_SUCCESS, analystService.getAmount("utility")));
    }

    @Operation(summary = "일반 지출 조회")
    @GetMapping("/common")
    public ResponseEntity<ResultResponse> getCommonAmount() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_COMMON_AMOUNT_SUCCESS, analystService.getAmount("common")));
    }

    @Operation(summary = "특정 월 지출 조회")
    @GetMapping("/{year}/{month}")
    public ResponseEntity<ResultResponse> getAmountForYearAndMonth(@PathVariable("year") Integer year, @PathVariable("month") Integer month) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_MONTH_AMOUNT_SUCCESS, analystService.getMonthAmount(year, month)));
    }

    // DB에 없는 이번 달 지출 조회
    @Operation(summary = "이번 달 지출 조회")
    @GetMapping("/current-month")
    public ResponseEntity<ResultResponse> getCurrentMonthAmount() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ANALYST_GET_CURRENT_MONTH_AMOUNT_SUCCESS, analystService.getCurrentMonthAmount()));
    }
}
