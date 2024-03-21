package com.ssafy.idk.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // ITEM
    ITEM_CATEGORY_NOT_FOUND(404, "I401", "해당 상품의 카테고리가 존재하지 않습니다"),
    ITEM_NOT_FOUND(404, "I402", "해당 상품이 존재하지 않습니다"),
    ITEM_BUY_FAIL(400, "I403", "상품 결제에 실패했습니다"),

    // ACCOUNT
    ACCOUNT_NOT_FOUND(404, "A401", "계좌가 존재하지 않습니다"),
    ACCOUNT_FAIL_DELETE(400, "A402", "계좌 해지를 실패했습니다"),
    ACCOUNT_FAIL_SAVE(400, "A403", "계좌 저장을 실패했습니다"),
    ACCOUNT_PWD_NOT_SAME(400, "A404", "계좌 비밀번호와 다릅니다"),
    ACCOUNT_BALANCE_LACK(400, "A405", "계좌의 잔액이 부족합니다"),
    ACCOUNT_EXISTS(404, "A406", "계좌가 존재합니다"),

    // TRANSACTION

    // MEMBER
    MEMBER_PHONE_ALREADY_VERIFIED(409, "M401", "이미 인증된 휴대폰 번호입니다."),
    MEMBER_NOT_FOUND(404, "M402", "존재하지 않는 회원입니다."),
    MEMBER_INVALID_PIN(400, "M403", "유효하지 않은 비밀번호입니다."),
    MEMBER_SMS_SEND_FAILED(400, "M404", "문자 전송 요청에 실패했습니다."),
    MEMBER_SMS_INVALID_CODE(400, "M405", "유효하지 않는 인증 코드입니다."),
    MEMBER_TOKEN_EXPIRED(401, "M406", "토큰이 만료되었습니다."),
    MEMBER_TOKEN_INVALID(400, "M407", "유효하지 않은 토큰입니다."),
    MEMBER_UNAUTHORIZED(401, "M408", "권한이 없습니다."),
    MEMBER_HEADER_NOT_FOUND(400, "M409", "Authorization 헤더가 없습니다."),
    MEMBER_INVALID_HEADER_FORMAT(400, "M410", "Authorization 헤더는 Bearer 토큰 형식이어야 합니다."),
    MEMBER_UNKNOWN_ERROR(400, "M411", "알 수 없는 에러가 발생했습니다."),

    // ANALYST
    ANALYST_NOT_MATCHED_TYPE(400, "AN400", "해당 지출 유형이 없습니다."),
    ANALYST_NOT_FOUND(404, "AN404", "해당 연월 지출내역이 없습니다."),

    // RSAKEY
    RSAKEY_NOT_FOUND(404, "R404", "RSAKEY가 존재하지 않습니다.");

    private final int status;
    private final String code;
    private final String message;
}
