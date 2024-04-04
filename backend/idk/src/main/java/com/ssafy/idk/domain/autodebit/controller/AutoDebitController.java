package com.ssafy.idk.domain.autodebit.controller;

import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitPaymentRequestDto;
import com.ssafy.idk.domain.autodebit.service.AutoDebitService;
import com.ssafy.idk.domain.autotransfer.dto.request.AutoTransferCreateRequestDto;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auto-debit")
@Slf4j
public class AutoDebitController {

    private final AutoDebitService autoDebitService;

    @Operation(summary = "자동결제 등록")
    @PostMapping("")
    public ResponseEntity<ResultResponse> createAutoDebit(@RequestBody AutoDebitCreateRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_CREATE_SUCCESS, autoDebitService.createAutoDebit(requestDto)));
    }

    @Operation(summary = "자동결제 상세 조회")
    @GetMapping("/{autoDebitId}")
    public ResponseEntity<ResultResponse> getDetailAutoDebit(@PathVariable(name = "autoDebitId") Long autoDebitId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_GET_SUCCESS, autoDebitService.getDetailAutoDebit(autoDebitId)));
    }

    @Operation(summary = "자동결제 삭제")
    @DeleteMapping("/{autoDebitId}")
    public ResponseEntity<ResultResponse> deleteAutoDebit(@PathVariable(name = "autoDebitId") Long autoDebitId) {
        autoDebitService.deleteAutoDebit(autoDebitId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_DELETE_SUCCESS));
    }

    @Operation(summary = "자동결제 목록 조회")
    @GetMapping("/list/{accountId}")
    public ResponseEntity<ResultResponse> getArrayAutoDebit(@PathVariable(name = "accountId") Long accountId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_LIST_GET_SUCCESS, autoDebitService.getArrayAutoDebit(accountId)));
    }

    @Operation(summary = "자동결제 청구")
    @PatchMapping("/payment")
    public ResponseEntity<ResultResponse> paymentAutoDebit(@RequestBody AutoDebitPaymentRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_PAYMENT_SUCCESS, autoDebitService.paymentAutoDebit(requestDto)));
    }
}
