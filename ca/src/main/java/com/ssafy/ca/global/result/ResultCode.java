package com.ssafy.ca.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    CA_CREATE_CI_SUCCESS(200, "C001", "CI가 생성되었습니다."),
    CA_CI_GET_SUCCESS(200, "C002", "CI를 조회했습니다."),
    CA_SIGN_REQUEST_SUCCESS(200, "C003", "전자서명을 요청했습니다."),
    CA_SIGN_VERIFY_SUCCESS(200, "C004", "전자서명 검증을 성공했습니다.");

    private final int status;
    private final String code;
    private final String message;

}
