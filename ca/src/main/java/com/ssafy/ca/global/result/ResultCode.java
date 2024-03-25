package com.ssafy.ca.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    CA_CI_CREATE_SUCCESS(200, "C001", "CI가 생성되었습니다.");

    private final int status;
    private final String code;
    private final String message;

    //
}
