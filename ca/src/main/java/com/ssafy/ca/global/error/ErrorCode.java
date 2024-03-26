package com.ssafy.ca.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    asdf(400, "CE400", "에러"),
    CA_CI_INVALID(400, "CE400", "유효하지 않은 CI입니다."),
    CA_SIGN_ERROR(400, "CE400", "전자 서명 에러"),
    CA_MEMBER_NOT_FOUND(400, "CE400", "유저를 찾을 수 없습니다."),
    CA_ORGANIZATION_NOT_FOUND(400, "CE400", "기관을 찾을 수 없습니다."),
    CA_SIGNATURE_NOT_FOUND(400, "CE400", "유저의 전자서명이 없습니다.");


    private final int status;
    private final String code;
    private final String message;
}
