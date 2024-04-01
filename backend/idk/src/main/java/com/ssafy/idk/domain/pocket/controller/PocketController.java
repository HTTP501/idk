package com.ssafy.idk.domain.pocket.controller;

import com.ssafy.idk.domain.pocket.dto.request.PocketCreateCreditRequestDto;
import com.ssafy.idk.domain.pocket.dto.request.PocketCreateAutoTransferRequestDto;
import com.ssafy.idk.domain.pocket.dto.request.PocketUpdateNameRequestDto;
import com.ssafy.idk.domain.pocket.dto.request.PocketUpdateOrderRequestDto;
import com.ssafy.idk.domain.pocket.service.PocketService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pocket")
@Slf4j
public class PocketController {

    private final PocketService pocketService;

    @Operation(summary = "돈 포켓 목록 조회")
    @GetMapping(value = "/list")
    public ResponseEntity<ResultResponse> getArrayPocket() {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_GET_LIST_SUCCESS, pocketService.getArrayPocket()));
    }

    @Operation(summary = "자동이체 돈 포켓 가입")
    @PostMapping(value = "/auto-transfer")
    public ResponseEntity<ResultResponse> createPocketAutoTransfer(@RequestBody PocketCreateAutoTransferRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_CREATE_BY_AUTO_TRANSFER_SUCCESS, pocketService.createByAutoTransfer(requestDto)));
    }

    @Operation(summary = "신용카드 마이데이터 돈 포켓 가입")
    @PostMapping(value = "/credit")
    public ResponseEntity<ResultResponse> createPocketCredit(@RequestBody PocketCreateCreditRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_CREATE_BY_CREDIT_MYDATA_SUCCESS, pocketService.createByCredit(requestDto)));
    }

    @Operation(summary = "돈 포켓 상세 조회(입출금내역)")
    @GetMapping(value = "/{pocketId}")
    public ResponseEntity<ResultResponse> getPocketDetail(@PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_GET_DETAIL_SUCCESS, pocketService.getPocketDetail(pocketId)));
    }

    @Operation(summary = "돈 포켓 입출금 내역 상세 조회")
    @GetMapping(value = "/{pocketId}/transaction/{transactionId}")
    public ResponseEntity<ResultResponse> getPocketTransactionDetail(@PathVariable(name = "pocketId") Long pocketId, @PathVariable(name = "transactionId") Long transactionId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_GET_TRANSACTION_DETAIL_SUCCESS, pocketService.getPocketTransactionDetail(pocketId, transactionId)));
    }

    @Operation(summary = "돈 포켓 자동이체 해지")
    @DeleteMapping(value = "/auto-transfer/{pocketId}")
    public ResponseEntity<ResultResponse> deletePocketAutoTransfer(@PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_AUTO_TRANSFER_DELETE_SUCCESS, pocketService.deletePocketAutoTransfer(pocketId)));
    }

    @Operation(summary = "돈 포켓 이름 수정")
    @PatchMapping(value = "/{pocketId}/name")
    public ResponseEntity<ResultResponse> updatePocketName(@RequestBody PocketUpdateNameRequestDto requestDto, @PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_UPDATE_NAME_SUCCESS, pocketService.updatePocketName(requestDto, pocketId)));
    }

    @Operation(summary = "돈 포켓 활성화 여부 수정")
    @PatchMapping(value = "/{pocketId}/is-activated")
    public ResponseEntity<ResultResponse> updatePocketIsActivated(@PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_UPDATE_IS_ACTIVATED_SUCCESS, pocketService.updatePocketIsActivated(pocketId)));
    }

    @Operation(summary = "돈 포켓 입금")
    @PatchMapping(value = "/{pocketId}/deposit")
    public ResponseEntity<ResultResponse> depositPocket(@PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_DEPOSIT_SUCCESS, pocketService.depositPocket(pocketId)));
    }

    @Operation(summary = "돈 포켓 출금")
    @PatchMapping(value = "/{pocketId}/withdrawal")
    public ResponseEntity<ResultResponse> withdrawalPocket(@PathVariable(name = "pocketId") Long pocketId) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_WITHDRAWAL_SUCCESS, pocketService.withdrawPocket(pocketId)));
    }

    @Operation(summary = "돈 포켓 순서 변경")
    @PutMapping(value = "/order")
    public ResponseEntity<ResultResponse> updatePocketOrders(@RequestBody PocketUpdateOrderRequestDto requestDto) {
        return ResponseEntity.ok(ResultResponse.of(ResultCode.POCKET_UPDATE_ORDER_SUCCESS, pocketService.updatePocketOrders(requestDto)));
    }

}
