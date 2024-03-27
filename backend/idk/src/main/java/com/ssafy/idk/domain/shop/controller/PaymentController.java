package com.ssafy.idk.domain.shop.controller;

import com.ssafy.idk.domain.shop.dto.request.ApprovalPaymentRequestDto;
import com.ssafy.idk.domain.shop.dto.request.ReadyPaymentRequestDto;
import com.ssafy.idk.domain.shop.service.PaymentService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(summary = "결제 요청")
    @PostMapping(value="/ready", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> readyPayment(@RequestBody ReadyPaymentRequestDto requestDto){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.PAYMENT_READY_SUCCESS, paymentService.readyPayment(requestDto)));
    }

    @Operation(summary = "결제 승인")
    @PostMapping(value="/approval", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> approvalPayment(@RequestBody ApprovalPaymentRequestDto requestDto){
        paymentService.approvalPayment(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.PAYMENT_APPROVAL_SUCCESS));
    }

//    @Operation(summary = "상품 목표저축 조회")
//    @GetMapping(value="/targetsaving")
//    public ResponseEntity<ResultResponse> getItemTargetSaving(){
//        return ResponseEntity.ok(ResultResponse.of(ResultCode.SUCCESS, paymentService.getItemTargetSaving()));
//    }
}
