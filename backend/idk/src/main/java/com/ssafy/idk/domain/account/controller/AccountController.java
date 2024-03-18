package com.ssafy.idk.domain.account.controller;

import com.ssafy.idk.domain.account.dto.request.*;
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
    public ResponseEntity<ResultResponse> createAccount(@RequestBody AccountCreateRequestDto requestDto, @PathVariable("memberId") Long memberId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_CREATE_SUCCESS, accountService.createAccount(requestDto, memberId)));
    }

    @Operation(summary = "계좌 조회")
    @GetMapping(value = "/{memberId}")
    public ResponseEntity<ResultResponse> getAccount(@PathVariable("memberId") Long memberId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_GET_SUCCESS, accountService.getAccount(memberId)));
    }

    @Operation(summary = "계좌 해지")
    @DeleteMapping(value = "/{memberId}")
    public ResponseEntity<ResultResponse> deleteAccount(@PathVariable("memberId") Long memberId){
        accountService.deleteAccount(memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_DELETE_SUCCESS));
    }

    @Operation(summary = "계좌 이름 변경")
    @PutMapping(value = "/name/{memberId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> updateName(@RequestBody AccountNameRequestDto requestDto, @PathVariable("memberId") Long memberId){
        accountService.updateName(requestDto, memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_UPDATE_NAME_SUCCESS));
    }

    @Operation(summary = "계좌 비밀번호 검증")
    @PostMapping(value = "/pwd/{memberId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> verityPwd(@RequestBody AccountPwdRequestDto requestDto, @PathVariable("memberId") Long memberId){
        accountService.verityPwd(requestDto, memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_VERITY_SUCCESS));
    }

    @Operation(summary = "계좌 비밀번호 변경")
    @PutMapping(value = "/pwd/{memberId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResultResponse> updatePwd(@RequestBody AccountPwdRequestDto requestDto, @PathVariable("memberId") Long memberId){
        accountService.updatePwd(requestDto, memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_UPDATE_PWD_SUCCESS));
    }

    @Operation(summary = "월급일 설정")
    @PutMapping(value = "/income-day/{day}/{memberId}")
    public ResponseEntity<ResultResponse> updatePayDate(@PathVariable("day") int day, @PathVariable("memberId") Long memberId) {
        accountService.updatePayDate(day, memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_UPDATE_INCOME_DAY_SUCCESS));
    }

    @Operation(summary = "최소보유금액 설정")
    @PutMapping("/minimum/{memberId}")
    public ResponseEntity<ResultResponse> updateMinAmount(@RequestBody AccountAmountRequestDto requestDto, @PathVariable("memberId") Long memberId){
        accountService.updateMinAmount(requestDto, memberId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_UPDATE_MIN_AMOUNT_SUCCESS));
    }

    @Operation(summary = "송금(이체)")
    @PostMapping("/transfer/{memberId}")
    public ResponseEntity<ResultResponse> transfer(@RequestBody TransferRequestDto requestDto, @PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ACCOUNT_TRANSFER_SUCCESS, accountService.transfer(requestDto, memberId)));
    }
}
