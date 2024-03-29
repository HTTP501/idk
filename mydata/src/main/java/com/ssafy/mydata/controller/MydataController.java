package com.ssafy.mydata.controller;

import com.ssafy.mydata.dto.request.AgreeRequestDto;
import com.ssafy.mydata.dto.request.CertifyRequestDto;
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

    // 마이데이터 동의
    @Operation(summary = "정보주체 마이데이터 이용 동의")
    @PostMapping("/agree")
    public ResponseEntity<ResultResponse> agree(@RequestBody AgreeRequestDto requestDto) {

        mydataService.agree(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_AGREE_SUCCESS));
    }


    // 통합 인증 요청
    @Operation(summary = "통합 인증 요청")
    @PostMapping("/certify")
    public ResponseEntity<ResultResponse> certify(@RequestBody CertifyRequestDto requestDto) {

        mydataService.certify(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_INTEGRATED_AUTHENTICATION_SUCCESS));
    }

    // 중계기관 역할(미정)
}
