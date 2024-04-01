package com.ssafy.bank.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {
    BANK_CREATE_DATA_SUCCESS(200, "B001", "은행사 더미 데이터 생성에 성공했습니다."),
    BANK_GET_ACCOUNT_LIST_SUCCESS(200, "B002", "계좌 목록 조회를 성공했습니다."),
    BANK_GET_ACCOUNT_DETAILS_SUCCESS(200, "B003", "계좌 상세 조회를 성공했습니다."),
    BANK_GET_AUTO_TRANSFER_INFO_SUCCESS(200, "B004", "자동이체 목록 조회를 성공했습니다."),
    BANK_AUTHENTICATION_SUCCESS(200, "B005", "인증에 성공했습니다.");

    private final int status;
    private final String code;
    private final String message;
}
