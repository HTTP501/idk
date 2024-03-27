package com.ssafy.ca.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    CA_REQUEST_INVALID(400, "C400", "유효하지 않은 요청입니다."),
    CA_CI_CREATE_FAILED(500, "C500", "CI 생성에 실패했습니다."),
    CA_CI_NOT_EXIST(404, "C404", "CI가 존재하지 않습니다."),
    CA_MEMBER_DUPLICATED(409, "C409", "이미 존재하는 사용자입니다."),
    CA_CI_INVALID(400, "C400", "유효하지 않은 CI입니다."),
    CA_SIGN_ERROR(500, "C500", "전자 서명 에러"),
    CA_SIGN_VERIFY_ERROR(400, "C400", "전자 서명 검증 에러"),
    CA_SIGN_VERIFY_FAILED(400, "C400", "전자 서명 검증 실패했습니다."),
    CA_SIGN_INVALID(400, "C400", "서명 데이터의 형식이 잘못되었습니다."),
    CA_MEMBER_NOT_FOUND(404, "C404", "존재하지 않는 사용자입니다."),
    CA_ORGANIZATION_NOT_FOUND(400, "C400", "기관을 찾을 수 없습니다."),
    CA_PRIVATE_KEY_NOT_EXIST(400, "C400", "개인 키 파일이 존재하지 않습니다."),
    CA_CERTIFICATION_NOT_EXIST(400, "C400", "인증서 파일이 존재하지 않습니다."),
    CA_SIGNATURE_NOT_FOUND(404, "C404", "유저의 전자서명이 없습니다.");


    private final int status;
    private final String code;
    private final String message;
}
