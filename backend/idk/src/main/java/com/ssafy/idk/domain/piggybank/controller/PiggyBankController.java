package com.ssafy.idk.domain.piggybank.controller;


import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankCreateRequestDto;
import com.ssafy.idk.domain.piggybank.service.PiggyBankService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/piggy-bank")
@Slf4j
public class PiggyBankController {

    private final PiggyBankService piggyBankService;

    @Operation(summary = "저금통 가입")
    @PostMapping(value = "")
    public ResponseEntity<ResultResponse> createPiggyBank(@RequestBody PiggyBankCreateRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.PIGGY_BANK_CREATE_SUCCESS, piggyBankService.createPiggyBank(requestDto)));
    }

    @Operation(summary = "저금통 조회")
    @GetMapping(value = "/{accountId}")
    public ResponseEntity<ResultResponse> getPiggyBank(@PathVariable("accountId") Long accountId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.PIGGY_BANK_GET_SUCCESS, piggyBankService.getPiggyBank(accountId)));
    }

}
