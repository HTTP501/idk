package com.ssafy.idk.domain.account.controller;

import com.ssafy.idk.domain.account.dto.request.AccountCreateRequestDto;
import com.ssafy.idk.domain.account.service.AccountService;
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
@RequestMapping("/api/account")
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @Operation(summary = "계좌 생성")
    @PostMapping(value="/{memberId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> getAccount(@RequestBody AccountCreateRequestDto requestDto, @PathVariable("memberId") Long memberId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_CREATE_SUCCESS, accountService.createAccount(requestDto, memberId)));
    }

    @Operation(summary = "계좌 조회")
    @GetMapping("/{memberId}")
    public ResponseEntity<ResultResponse> getAccount(@PathVariable("memberId") Long memberId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_GET_SUCCESS, accountService.getAccount(memberId)));
    }

    @Operation(summary = "계좌 잔액 조회")
    @GetMapping("/balance/{memberId}")
    public ResponseEntity<ResultResponse> getAccountBalance(@PathVariable("userId") Long memberId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_GET_SUCCESS, accountService.getAccountBalance(memberId)));
    }
}
