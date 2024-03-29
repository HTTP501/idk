package com.ssafy.mydata.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {

    MYDATA_INTEGRATED_AUTHENTICATION_SUCCESS(200, "MY001", "통합 인증 요청 성공했습니다."),
    MYDATA_AGREE_SUCCESS(200, "MY002", "마이데이터 이용에 동의했습니다.")
    ;

    private final int status;
    private final String code;
    private final String message;

}
