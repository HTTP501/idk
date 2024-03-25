package com.ssafy.ca.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    asdf(400, "CE400", "에러"),
    CA_SIGN_ERROR(400, "CE400", "전자 서명 에러");


    private final int status;
    private final String code;
    private final String message;
}
