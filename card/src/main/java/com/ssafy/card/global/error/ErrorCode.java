package com.ssafy.card.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // COMMON
    COMMON_MEMBER_NOT_CORRECT(409, "CARD-C401", "해당 요청 사용자와 해당 정보의 사용자가 일치하지 않습니다."),

    // MEMBER
    MEMBER_BIRTH_DATE_EXISTS(409, "CARD-M401", "이미 존재하는 주민번호입니다."),
    MEMBER_PHONE_NUMBER_EXISTS(409, "CARD-M402", "이미 존재하는 전화번호입니다."),
    MEMBER_CI_EXISTS(409, "CARD-M403", "이미 존재하는 CI입니다."),
    MEMBER_NOT_FOUND(404, "CARD-M404", "유효하지 않은 CI입니다."),

    // COMPANY
    COMPANY_NOT_FOUND(404, "CARD-CP401", "해당 신용카드사 정보를 찾을 수 없습니다."),

    // ORGANIZATION
    ORGANIZATION_NOT_FOUND(404, "CARD-ORG401", "해당 기관 정보를 찾을 수 없습니다."),
    ORGANIZATION_INCORRECT(409, "CARD-ORG402", "해당 신용카드와 기관 정보가 일치하지 않습니다."),

    // CREDIT
    CREDIT_NOT_FOUND(404, "CARD-CRDT401", "해당 신용카드를 찾을 수 없습니다."),

    // PAYMENT
    PAYMENT_NOT_FOUND(404, "CARD-PM401", "해당 결제 정보를 찾을 수 없습니다."),

    ;

    private final int status;
    private final String code;
    private final String message;

}
