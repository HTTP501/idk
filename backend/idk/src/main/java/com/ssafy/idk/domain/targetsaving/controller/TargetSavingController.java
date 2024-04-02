package com.ssafy.idk.domain.targetsaving.controller;

import com.ssafy.idk.domain.targetsaving.dto.request.TargetSavingCreateRequestDto;
import com.ssafy.idk.domain.targetsaving.service.TargetSavingService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/target-saving")
@Slf4j
public class TargetSavingController {

    private final TargetSavingService targetSavingService;

    @Operation(summary = "목표저축 가입")
    @PostMapping(value = "")
    public ResponseEntity<ResultResponse> createTargetSaving(@RequestBody TargetSavingCreateRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TARGET_SAVING_CREATE_SUCCESS, targetSavingService.createTargetSaving(requestDto)));
    }

    @Operation(summary = "목표저축 해지")
    @DeleteMapping(value = "/{targetSavingId}")
    public ResponseEntity<ResultResponse> deleteTargetSaving(@PathVariable("targetSavingId") Long targetSavingId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TARGET_SAVING_DELETE_SUCCESS, targetSavingService.deleteTargetSaving(targetSavingId)));
    }

    @Operation(summary = "목표저축 상세 조회")
    @GetMapping(value = "/{targetSavingId}")
    public ResponseEntity<ResultResponse> getTargetSaving(@PathVariable("targetSavingId") Long targetSavingId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TARGET_SAVING_GET_SUCCESS, targetSavingService.getTargetSaving(targetSavingId)));
    }

    @Operation(summary = "목표저축 목록 조회")
    @GetMapping(value = "/list/{accountId}")
    public ResponseEntity<ResultResponse> getTargetSavingList(@PathVariable("accountId") Long accountId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TARGET_SAVING_LIST_GET_SUCCESS, targetSavingService.getTargetSavingList(accountId)));
    }

}
