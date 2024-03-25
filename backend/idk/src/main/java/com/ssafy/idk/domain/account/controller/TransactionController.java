package com.ssafy.idk.domain.account.controller;

import com.ssafy.idk.domain.account.service.TransactionService;
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
}
