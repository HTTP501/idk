package com.ssafy.card.domain.credit.controller;


import com.ssafy.card.domain.credit.dto.request.CreditCreateRequestDto;
import com.ssafy.card.domain.credit.service.CreditService;
import com.ssafy.card.global.result.ResultCode;
import com.ssafy.card.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/card/member")
@Slf4j
public class CreditController {

    private final CreditService creditService;

    @Operation(summary = "신용카드 생성")
    @PostMapping("/credit")
    public ResponseEntity<ResultResponse> creatdCrdit(@RequestBody CreditCreateRequestDto requestDto) {
        creditService.createCredit(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREDIT_CREATE_SUCCESS));
    }

}
