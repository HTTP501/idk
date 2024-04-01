package com.ssafy.idk.domain.fcm.controller;

import com.ssafy.idk.domain.fcm.service.FcmService;
import com.ssafy.idk.domain.fcm.dto.request.FcmTokenRequestDto;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/fcm")
@RequiredArgsConstructor
@RestController
public class FcmController {

    private final FcmService fcmService;

    @Operation(summary = "알림기기 토큰 갱신")
    @PostMapping("/token")
    public ResponseEntity<?> saveToken(@RequestBody FcmTokenRequestDto requestDto) {
        fcmService.saveToken(requestDto);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.FCM_SAVE_SUCCESS));
    }

    @Operation(summary = "알림기기 토큰 삭제")
    @DeleteMapping("/token")
    public ResponseEntity<?> deleteToken() {
        fcmService.deleteToken();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.FCM_DELETE_SUCCESS));
    }
}
