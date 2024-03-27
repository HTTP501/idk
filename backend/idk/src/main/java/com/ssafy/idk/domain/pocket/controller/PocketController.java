package com.ssafy.idk.domain.pocket.controller;

import com.ssafy.idk.domain.pocket.dto.request.PocketCreateTargetSavingRequestDto;
import com.ssafy.idk.domain.pocket.service.PocketService;
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
@RequestMapping("/api/pocket")
@Slf4j
public class PocketController {

    private final PocketService pocketService;

//    @Operation(summary = "목표 저축 돈 포켓 가입")
//    @PostMapping(value = "/target-saving")
//    public ResponseEntity<ResultResponse> createPocketTargetSaving(@RequestBody PocketCreateTargetSavingRequestDto requestDto) {
//        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_CREATE_BY_TARGET_SAVING_SUCCESS, pocketService.createByTargetSaving(requestDto)));
//    }
}
