package com.ssafy.idk.domain.autotransfer.controller;

import com.ssafy.idk.domain.autotransfer.dto.request.AutoTransferCreateRequestDto;
import com.ssafy.idk.domain.autotransfer.service.AutoTransferService;
import com.ssafy.idk.domain.piggybank.dto.request.PiggyBankCreateRequestDto;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
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
@RequestMapping("/api/auto-transfer")
@Slf4j
public class AutoTransferController {

    private final AutoTransferService autoTransferService;

    @Operation(summary = "자동이체 가입")
    @PostMapping(value = "")
    public ResponseEntity<ResultResponse> createAutoTransfer(@RequestBody AutoTransferCreateRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_TRANSFER_CREATE_SUCCESS, autoTransferService.createAutoTransfer(requestDto)));
    }

}
