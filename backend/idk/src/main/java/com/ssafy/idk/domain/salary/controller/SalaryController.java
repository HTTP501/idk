package com.ssafy.idk.domain.salary.controller;

import com.ssafy.idk.domain.salary.dto.SalaryRequestDto;
import com.ssafy.idk.domain.salary.dto.SalaryCreateRequestDto;
import com.ssafy.idk.domain.salary.service.SalaryService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/salary")
@Slf4j
public class SalaryController {

    private final SalaryService salaryService;

    @Operation(summary = "월급 등록")
    @PostMapping("")
    public ResponseEntity<ResultResponse> createSalary(@RequestBody SalaryRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.SALARY_CREATE_SUCCESS, salaryService.createSalary(requestDto)));
    }

    @Operation(summary = "월급 조회")
    @GetMapping("/{accountId}")
    public ResponseEntity<ResultResponse> getSalary(@PathVariable(name = "accountId") Long accountId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.SALARY_GET_SUCCESS, salaryService.getSalary(accountId)));
    }

    @Operation(summary = "월급 삭제")
    @DeleteMapping("/{salaryId}")
    public ResponseEntity<ResultResponse> deleteSalary(@PathVariable(name = "salaryId") Long salaryId) {
        salaryService.deleteSalary(salaryId);
        return ResponseEntity.ok(ResultResponse.of(ResultCode.SALARY_DELETE_SUCCESS));
    }

    @Operation(summary = "월급 수정")
    @PutMapping("/{salaryId}")
    public ResponseEntity<ResultResponse> updateSalary(@RequestBody SalaryRequestDto requestDto, @PathVariable(name = "salaryId") Long salaryId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.SALARY_UPDATE_SUCCESS, salaryService.updateSalary(requestDto, salaryId)));
    }
}
