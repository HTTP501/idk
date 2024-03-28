package com.ssafy.idk.domain.autodebit.controller;


import com.ssafy.idk.domain.autodebit.service.AutoDebitService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auto-transfer")
@Slf4j
public class AutoDebitController {

    private final AutoDebitService autoDebitService;

//    @Operation(summary = "자동납부 가입")

}
