package com.ssafy.idk.domain.targetsaving.controller;

import com.ssafy.idk.domain.targetsaving.dto.request.TargetSavingCreateRequestDto;
import com.ssafy.idk.domain.targetsaving.service.TargetSavingService;
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
@RequestMapping("/api/target-saving")
@Slf4j
public class TargetSavingController {

    private final TargetSavingService targetSavingService;

    @Operation(summary = "목표저축 가입")
    @PostMapping(value = "")
    public ResponseEntity<ResultResponse> createTargetSaving(@RequestBody TargetSavingCreateRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.TARGET_SAVING_CREATE_SUCCESS, targetSavingService.createTargetSaving(requestDto)));
    }

}
