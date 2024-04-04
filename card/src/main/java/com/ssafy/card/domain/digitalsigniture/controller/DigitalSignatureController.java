package com.ssafy.card.domain.digitalsigniture.controller;

import com.ssafy.card.domain.digitalsigniture.dto.request.AuthenticationRequestDto;
import com.ssafy.card.domain.digitalsigniture.service.SignService;
import com.ssafy.card.global.result.ResultCode;
import com.ssafy.card.global.result.ResultResponse;
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
@RequestMapping("/api/card")
@Slf4j
public class DigitalSignatureController {

    private final SignService signService;

    // 통합 인증(토큰 발급)
    @Operation(summary = "인증")
    @PostMapping("/certify")
    public ResponseEntity<ResultResponse> authentication(@RequestBody AuthenticationRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.MYDATA_AUTHENTICATION_SUCCESS, signService.authentication(requestDto)));
    }
}
