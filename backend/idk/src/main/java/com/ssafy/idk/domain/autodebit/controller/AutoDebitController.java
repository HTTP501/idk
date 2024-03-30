package com.ssafy.idk.domain.autodebit.controller;

import com.ssafy.idk.domain.autodebit.dto.request.AutoDebitCreateRequestDto;
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
        autoDebitService.createAutoDebit(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_CREATE_SUCCESS));
    }

    @Operation(summary = "자동결제 상세 조회")
    @GetMapping("/{autoDebitId}")
    public ResponseEntity<ResultResponse> getDetailAutoDebit(@PathVariable(name = "autoDebitId") Long autoDebitId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.AUTO_DEBIT_GET_SUCCESS, autoDebitService.getDetailAutoDebit()));
    }

}
