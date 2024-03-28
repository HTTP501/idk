package com.ssafy.idk.domain.account.controller;

import com.ssafy.idk.domain.account.dto.request.AmountRequestDto;
import com.ssafy.idk.domain.account.service.TransactionService;
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
@RequestMapping("/api/transaction")
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    @Operation(summary = "계좌 입출금 내역 조회")
    @GetMapping("/")
    public ResponseEntity<ResultResponse> getAccount(){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_GET_SUCCESS, transactionService.getTransaction()));
    }

    @Operation(summary = "ATM 입금")
    @PostMapping(value="/deposit", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> atmDeposit(@RequestBody AmountRequestDto requestDto){
        transactionService.atmDeposit(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TRANSACTION_ATM_DEPOSIT_SUCCESS));
    }

    @Operation(summary = "ATM 출금")
    @PostMapping(value="/withdraw", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> atmWithdraw(@RequestBody AmountRequestDto requestDto){
        transactionService.atmWithdraw(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TRANSACTION_ATM_WITHDRAW_SUCCESS));
    }
}
