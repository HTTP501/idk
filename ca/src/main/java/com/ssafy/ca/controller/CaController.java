package com.ssafy.ca.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ca.dto.CreateCIRequestDto;
import com.ssafy.ca.dto.GetCIRequestDto;
import com.ssafy.ca.dto.SignRequestDto;
import com.ssafy.ca.global.result.ResultCode;
import com.ssafy.ca.global.result.ResultResponse;
import com.ssafy.ca.service.CaService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/ca")
@Slf4j
public class CaController {

    private final CaService caService;

    // ci 생성
    @Operation(summary = "ci 생성")
    @PostMapping("/member/ci_create")
    public ResponseEntity<ResultResponse> createCI(@RequestBody CreateCIRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_CI_CREATE_SUCCESS, caService.createCI(requestDto)));
    }

    // ci 조회
    @Operation(summary = "ci 조회")
    @GetMapping("/member/ci")
    public ResponseEntity<ResultResponse> getCI(@RequestBody GetCIRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_CI_CREATE_SUCCESS, caService.getCI(requestDto)));
    }

    // 전자서명 요청
    @Operation(summary = "전자서명 요청")
    @GetMapping("/sign_request")
    public ResponseEntity<ResultResponse> signRequest(@RequestBody SignRequestDto requestDto) throws JsonProcessingException {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_CI_CREATE_SUCCESS, caService.signRequest(requestDto)));
    }


    // 전자서명 검증
}
