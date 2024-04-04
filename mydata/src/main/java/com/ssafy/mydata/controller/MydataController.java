package com.ssafy.mydata.controller;

import com.ssafy.mydata.dto.request.AgreeRequestDto;
import com.ssafy.mydata.dto.request.SignupRequestDto;
import com.ssafy.mydata.dto.request.VerifyAuthRequestDto;
import com.ssafy.mydata.global.result.ResultCode;
import com.ssafy.mydata.global.result.ResultResponse;
import com.ssafy.mydata.service.MydataService;
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
@RequestMapping("/api/mydata")
@Slf4j
public class MydataController {

    private final MydataService mydataService;

    // 회원가입(더미데이터 생성)
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> signup(@RequestBody SignupRequestDto requestDto) {

        mydataService.signup(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_SIGNUP_SUCCESS));
    }

    // 마이데이터 동의
    @Operation(summary = "정보주체 마이데이터 이용 동의")
    @PostMapping("/agree")
    public ResponseEntity<ResultResponse> agree(@RequestBody AgreeRequestDto requestDto) {

        mydataService.agree(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_AGREE_SUCCESS));
    }

    // 권한 검증 요청
    @Operation(summary = "권한 검증 요청")
    @PostMapping("/verify_authority")
    public ResponseEntity<ResultResponse> vertifyAuth(@RequestBody VerifyAuthRequestDto requestDto) {

        mydataService.vertifyAuth(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_INTEGRATED_AUTHENTICATION_SUCCESS));
    }
}
