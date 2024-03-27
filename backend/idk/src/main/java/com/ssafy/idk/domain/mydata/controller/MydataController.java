package com.ssafy.idk.domain.mydata.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/idk/mydata")
@Slf4j
public class MydataController {

    @Operation(summary = "마이데이터 동의")
    @PostMapping("/agree")

    @Operation(summary = "마이데이터 자산 연결")
    @PostMapping("/agree")


}
