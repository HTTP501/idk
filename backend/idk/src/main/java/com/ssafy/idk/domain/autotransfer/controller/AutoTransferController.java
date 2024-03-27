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
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "자동이체 해지")
    @DeleteMapping(value = "/{autoTransferId}")
    public ResponseEntity<ResultResponse> deleteAutoTransfer(@PathVariable(name = "autoTransferId") Long autoTransferId) {
        autoTransferService.deleteAutoTransfer(autoTransferId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_TRANSFER_DELETE_SUCCESS));
    }

    @Operation(summary = "자동이체 상세 조회")
    @GetMapping(value = "/{autoTransferId}")
    public ResponseEntity<ResultResponse> getAutoTransfer(@PathVariable(name = "autoTransferId") Long autoTransferId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_TRANSFER_GET_SUCCESS, autoTransferService.getAutoTransfer(autoTransferId)));
    }
}
