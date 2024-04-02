package com.ssafy.bank.controller;

import com.ssafy.bank.dto.request.AuthenticationRequestDto;
import com.ssafy.bank.dto.request.CreateDataRequestDto;
import com.ssafy.bank.entity.Member;
import com.ssafy.bank.exception.BankException;
import com.ssafy.bank.global.error.ErrorCode;
import com.ssafy.bank.global.result.ResultCode;
import com.ssafy.bank.global.result.ResultResponse;
import com.ssafy.bank.repository.MemberRepository;
import com.ssafy.bank.service.BankService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bank")
@Slf4j
public class BankController {

    private final BankService bankService;
    private final MemberRepository memberRepository;

    // 회원 생성 db 저장, 계좌 더미데이터 생성
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ResultResponse> signup(@RequestBody CreateDataRequestDto requestDto) {

        // 회원 가입
        bankService.signup(requestDto);

        // 멤버 조회
        Member member = memberRepository.findByConnectionInformation(requestDto.getConnectionInformation())
                .orElseThrow(() -> new BankException(ErrorCode.BANK_MEMBER_NOT_FOUND));

        // 계좌 생성(3 ~ 5개)
        int numAccountsToCreate = new Random().nextInt(3) + 3; // 3에서 5까지의 임의의 수
        for (int i = 0; i < numAccountsToCreate; i++) {
            bankService.createAccount(member);
        }

        // 자동이체 생성(3 ~ 8개)
        int numAutoTransfersToCreate = new Random().nextInt(6) + 3; // 3에서 8까지의 임의의 수
        for (int i = 0; i < numAutoTransfersToCreate; i++) {
            bankService.createAutoTransfer(member);
        }

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_CREATE_DATA_SUCCESS));
    }

    // 인증 요청(토큰 발급)
    @Operation(summary = "인증")
    @PostMapping("/certify")
    public ResponseEntity<ResultResponse> authentication(@RequestBody AuthenticationRequestDto requestDto) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_AUTHENTICATION_SUCCESS, bankService.authentication(requestDto)));
    }

    // 계좌 목록 조회
    @Operation(summary = "고객 소유 계좌 목록 조회")
    @GetMapping("/accounts")
    public ResponseEntity<ResultResponse> getAccountList(@RequestParam("name") String name, @RequestParam("connectionInformation") String connectionInformation, @RequestParam("orgCode") String orgCode) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_GET_ACCOUNT_LIST_SUCCESS, bankService.getAccountList(name, connectionInformation, orgCode)));
    }

    // 단일 계좌 상세 정보 (계좌번호, 잔고, 이름, 은행)
    @Operation(summary = "단일 계좌 목록 조회")
    @GetMapping("/account/details")
    public ResponseEntity<ResultResponse> getAccountDetails(@RequestParam("orgCode") String orgCode, @RequestParam("accountNumber") String accountNumber) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_GET_ACCOUNT_DETAILS_SUCCESS, bankService.getAccountDetails(orgCode, accountNumber)));
    }

    // 고객의 자동이체(상세정보 포함) 목록 조회
    @Operation(summary = "고객 자동이체 목록 조회")
    @GetMapping("/auto-transfer")
    public ResponseEntity<ResultResponse> getAutoTransferInfo(@RequestParam("name") String name, @RequestParam("connectionInformation") String connectionInformation) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_GET_AUTO_TRANSFER_INFO_SUCCESS, bankService.getAutoTransferInfo(name, connectionInformation)));
    }

    // 계좌 명의 조회
    @Operation(summary = "계좌 명의 조회")
    @GetMapping("/account")
    public ResponseEntity<ResultResponse> getAccount(@RequestParam("orgName") String orgName, @RequestParam("accountNumber") String accountNumber) {

        return ResponseEntity.ok(ResultResponse.of(ResultCode.BANK_GET_ACCOUNT_INFO_SUCCESS, bankService.getAccountInfo(orgName, accountNumber)));
    }
}
