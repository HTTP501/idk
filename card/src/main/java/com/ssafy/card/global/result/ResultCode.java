package com.ssafy.card.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    // COMMON
    SUCCESS(200, "C001", "정상 처리 되었습니다"),

    // MEMBER
    MEMBER_SIGNUP_SUCCESS(201, "CARD-M001", "CARD SERVER 회원가입이 완료되었습니다."),

    ;


    private final int status;
    private final String code;
    private final String message;

    }