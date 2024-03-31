package com.ssafy.bank.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BANK_MEMBER_NOT_FOUND(404, "B404", "회원을 찾을 수 없습니다."),
    BANK_MEMBER_DUPLICATED(409, "B409", "중복된 회원입니다."),
    BANK_ORG_NOT_FOUND(404, "B404", "기관을 찾을 수 없습니다."),
    BANK_NOT_FOUND(404, "B404", "은행을 찾을 수 없습니다."),
    BANK_ACCOUNT_NOT_FOUND(404, "B404", "계좌를 찾을 수 없습니다."),
    BANK_INFO_MISMATCH_ERROR(400, "B400", "은행 정보가 일치하지 않습니다."),
    BANK_MEMBER_INFO_MISMATCH_ERROR(400, "B400", "회원 이름이 일치하지 않습니다."),
    BANK_ORG_AUTHENTICATION_FAILED(400, "B400", "마이데이터 사업자 권한 검증에 실패했습니다."),
    BANK_SIGNALUTE_INVALID(400, "B400", "전자서명 검증에 실패했습니다."),
    BANK_MYDATA_REQUEST_FAILED(400, "B400", "종합포털 요청에 실패했습니다.");

    private final int status;
    private final String code;
    private final String message;

}
