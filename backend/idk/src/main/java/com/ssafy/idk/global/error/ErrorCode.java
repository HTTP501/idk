package com.ssafy.idk.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // COMMON
    COMMON_MEMBER_NOT_CORRECT(409, "C401", "해당 요청 사용자와 해당 정보의 사용자가 일치하지 않습니다."),

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
    RSAKEY_NOT_FOUND(404, "R404", "RSAKEY가 존재하지 않습니다."),

    // PIGGY_BANK
    PIGGY_BANK_EXISTS(409, "PB401", "이미 저금통을 가입한 계좌입니다."),
    PIGGY_BANK_INSUFFICIENT_ACCOUNT_BALANCE(409, "PB402", "계좌 잔액이 부족합니다."),
    PIGGY_BANK_NOT_FOUND(404, "PB403", "저금통이 존재하지 않습니다."),
    PIGGY_BANK_INSUFFICIENT_BALANCE(409, "PB404", "저금통 잔액이 부족합니다."),

    // TARGET_SAVING
    TARGET_SAVING_NOT_FOUND(404, "TS401", "해당 목표저축이 존재하지 않습니다."),

    // AUTO_TRANSFER
    AUTO_TRANSFER_MY_ACCOUNT_NOT_FOUND(404, "AT401", "출금 계좌가 유효하지 않습니다."),
    AUTO_TRANSFER_INVALID_ACCOUNT(404, "AT402", "자동이체 계좌가 유효하지 않습니다."),
    AUTO_TRANSFER_AMOUNT_NEED_TO_EXCEED_ZERO(409, "AT403", "자동이체 금액은 0원 이하로 등록할 수 없습니다."),
    AUTO_TRANSFER_IMPOSSIBLE_STARTDATE(409, "AT404", "자동이체 기간이 유효하지 않습니다."),
    AUTO_TRANSFER_NOT_FOUND(404, "AT405", "해당 자동이체 정보가 존재하지 않습니다."),

    // AUTO_DEBIT
    AUTO_DEBIT_NOT_FOUND(404, "AD401", "해당 자동납부가 존재하지 않습니다."),

    // POCKET
    POCKET_TARGET_SAVING_NOT_FOUND(404, "P401", "해당 목표저축이 존재하지 않습니다."),
    POCKET_AUTO_TRANSFER_NOT_FOUND(404, "P402", "해당 자동이체가 존재하지 않습니다."),
    POCKET_AUTO_DEBIT_NOT_FOUND(404, "P403", "해당 자동결제가 존재하지 않습니다."),
    POCKET_NOT_FOUND(404, "P404", "해당 돈 포켓이 존재하지 않습니다."),
    POCKET_IMPOSSIBLE_DEPOSIT(409, "P405", "해당 돈 포켓에 돈을 입금할 수 없습니다."),
    POCKET_IMPOSSIBLE_WITHDRAWAL(409, "P406", "해당 돈 포켓의 돈을 출금할 수 없습니다."),

    // PAYMENT
    PAYMENT_VERIFY_FAIL(400, "P401", "결제수단 검증에 실패했습니다"),
    PAYMENT_INFORMATION_NOT_FOUND(404, "P402", "결제 요청 정보를 찾을 수 없습니다")
    ;

    private final int status;
    private final String code;
    private final String message;
}
