package com.ssafy.card.domain.credit.controller;


import com.ssafy.card.domain.credit.dto.request.CreditCreateRequestDto;
import com.ssafy.card.domain.credit.dto.request.CreditUpdateRequestDto;
import com.ssafy.card.domain.credit.service.CreditService;
import com.ssafy.card.global.result.ResultCode;
import com.ssafy.card.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/card/credit")
@Slf4j
public class CreditController {

    private final CreditService creditService;

    @Operation(summary = "신용카드 생성")
    @PostMapping("")
    public ResponseEntity<ResultResponse> createCredit(@RequestBody CreditCreateRequestDto requestDto) {
        creditService.createCredit(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREDIT_CREATE_SUCCESS));
    }

    @Operation(summary = "카드대금 청구 계좌번호 수정")
    @PatchMapping("/{creditId}")
    public ResponseEntity<ResultResponse> updateAccountNum(@RequestBody CreditUpdateRequestDto requestDto, @PathVariable(name = "creditId") Long creditId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREDIT_UPDATE_SUCCESS, creditService.updateAccountNum(requestDto, creditId)));
    }

}
