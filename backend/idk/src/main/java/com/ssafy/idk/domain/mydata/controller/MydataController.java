package com.ssafy.idk.domain.mydata.controller;

import com.ssafy.idk.domain.mydata.dto.request.MydataConnectRequestDto;
import com.ssafy.idk.domain.mydata.service.MydataService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/idk/mydata")
@Slf4j
public class MydataController {

    private final MydataService mydataService;

    @Operation(summary = "마이데이터 동의")
    @PostMapping("/agree")
    public ResponseEntity<ResultResponse> agreeMydata() {

        mydataService.agreeMydata();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_AGREE_SUCCESS));
    }
    @Operation(summary = "마이데이터 자산 연결")
    @PostMapping("/connect")
    public ResponseEntity<ResultResponse> connectMydata(@Valid @RequestBody MydataConnectRequestDto requestDto) {

        mydataService.connectMydata(requestDto.getOrgList());
        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_CONNECT_SUCCESS));
    }

    @Operation(summary = "마이데이터 조회")
    @GetMapping("/")
    public ResponseEntity<ResultResponse> getMydata() {

        mydataService.getMydata();
        return ResponseEntity.ok(ResultResponse.of(ResultCode.IDK_MYDATA_GET_SUCCESS));
    }
}
