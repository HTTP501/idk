package com.ssafy.ca.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ca.dto.CreateCIRequestDto;
import com.ssafy.ca.dto.GetCIRequestDto;
import com.ssafy.ca.dto.SignRequestDto;
import com.ssafy.ca.dto.SignVerifyRequestDto;
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

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_CREATE_CI_SUCCESS, caService.createCI(requestDto)));
    }

    // ci 조회
    @Operation(summary = "ci 조회")
    @GetMapping("/member/ci")
    public ResponseEntity<ResultResponse> getCI(@RequestParam("name") String name, @RequestParam("birthDate") String birthDate, @RequestParam("phoneNumber") String phoneNumber) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_CI_GET_SUCCESS, caService.getCI(name, birthDate, phoneNumber)));
    }

    // 전자서명 요청
    @Operation(summary = "전자서명 요청")
    @PostMapping("/sign_request")
    public ResponseEntity<ResultResponse> signRequest(@RequestBody SignRequestDto requestDto) throws Exception {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_SIGN_REQUEST_SUCCESS, caService.signRequest(requestDto)));
    }


    // 전자서명 검증
    @Operation(summary = "전자서명 검증")
    @PostMapping("/sign_verify")
    public ResponseEntity<ResultResponse> signVerify(@RequestBody SignVerifyRequestDto requestDto) throws Exception {
        caService.signVerify(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.CA_SIGN_VERIFY_SUCCESS));
    }
}
