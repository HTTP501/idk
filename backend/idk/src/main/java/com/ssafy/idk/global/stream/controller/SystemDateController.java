package com.ssafy.idk.global.stream.controller;

import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import com.ssafy.idk.global.stream.dto.SystemDateResponseDto;
import com.ssafy.idk.global.util.TimeUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/systemDate")
@RequiredArgsConstructor
public class SystemDateController {
    private final TimeUtil timeUtil;


    @Operation(summary = "시스템 시간 조회")
    @GetMapping("")
    public ResponseEntity<ResultResponse> getSystemDate() {
        SystemDateResponseDto systemDateResponseDto = SystemDateResponseDto.of(timeUtil.getSystemDate());
        return ResponseEntity.ok(ResultResponse.of(ResultCode.SYSTEM_DATE_GET_SUCCESS, systemDateResponseDto));
    }
}
