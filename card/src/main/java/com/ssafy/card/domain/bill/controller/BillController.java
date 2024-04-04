package com.ssafy.card.domain.bill.controller;

import com.ssafy.card.domain.bill.service.BillService;
import com.ssafy.card.domain.credit.dto.request.CreditRequestDto;
import com.ssafy.card.global.result.ResultCode;
import com.ssafy.card.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/card/payment")
@Slf4j
public class BillController {

    private final BillService billService;

    @Operation(summary = "[마이데이터] 회원 결제정보 조회")
    @GetMapping("")
    public ResponseEntity<ResultResponse> getPayment(@RequestParam("connectionInformation") String connectionInformation, @RequestParam("orgCode") String orgCode) {
//        String accessToken = token.replace("Bearer ", "");

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CREDIT_GET_PAYMENT_SUCCESS, billService.getPayment(connectionInformation, orgCode)));
    }
}
