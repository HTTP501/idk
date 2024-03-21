package com.ssafy.idk.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public enum ResultCode {

    // COMMON
    SUCCESS(200, "C001", "정상 처리 되었습니다"),

    // ITEM
    ITEM_SUCCESS(200, "I001", "상품에 대한 상세조회했습니다"),
    ITEM_CATEGORY_SUCCESS(200, "I002", "카테고리에 따른 상품을 조회했습니다"),
    ITEM_BUY_SUCCESS(200, "I003", "상품을 결제했습니다"),

    // ACCOUNT
    ACCOUNT_CREATE_SUCCESS(201, "A001", "계좌를 생성했습니다"),
    ACCOUNT_GET_SUCCESS(200, "A002", "계좌를 조회했습니다"),
    ACCOUNT_DELETE_SUCCESS(200, "A003", "계좌를 해지했습니다"),
    ACCOUNT_UPDATE_NAME_SUCCESS(201, "A004", "계좌 이름을 변경했습니다"),
    ACCOUNT_VERITY_SUCCESS(200, "A005", "계좌 비밀번호 검증에 성공했습니다"),
    ACCOUNT_UPDATE_PWD_SUCCESS(201, "A006", "계좌 비밀번호를 변경했습니다"),
    ACCOUNT_UPDATE_INCOME_DAY_SUCCESS(201, "A007", "월급일을 변경했습니다"),
    ACCOUNT_UPDATE_MIN_AMOUNT_SUCCESS(201, "A008", "계좌의 최소보유금액을 변경했습니다"),
    ACCOUNT_TRANSFER_SUCCESS(201, "A009", "해당 계좌로 송금했습니다"),

    // MEMBER
    MEMBER_SIGNUP_SUCCESS(201, "M001", "회원가입에 성공했습니다."),
    MEMEBER_RENEW_TOKEN_SUCCESS(200, "M002", "토큰 재발급에 성공했습니다."),
    MEMBER_LOGIN_PIN_SUCCESS(200, "M003", "PIN 로그인에 성공했습니다."),
    MEMBER_LOGIN_BIO_SUCCESS(200, "M004", "생체 인증 로그인 성공했습니다."),
    MEMBER_PHONE_VERIFICATION_REQUEST_SUCCESS(200, "M005", "휴대폰 본인 인증 요청 성공했습니다."),
    MEMBER_PHONE_CODE_VERIFICATION_SUCCESS(200, "M006", "휴대폰 인증 코드 검증에 성공했습니다."),

    // PIGGY_BANK
    PIGGY_BANK_CREATE_SUCCESS(201, "P201", "저금통 가입에 성공했습니다."),
    PIGGY_BANK_DELETE_SUCCESS(204, "P202", "저금통 해지에 성공했습니다."),
    PIGGY_BANK_GET_SUCCESS(200, "P203", "저금통을 조회했습니다."),
    PIGGY_BANK_TRANSACTION_GET_SUCCESS(200, "P204", "저금통 입출금내역을 조회했습니다."),
    PIGGY_BANK_DEPOSIT_SUCCESS(201, "P205", "저금통에 입금을 완료했습니다."),
    PIGGY_BANK_WITHDRAW_SUCCESS(201, "P206", "저금통에서 출금을 완료했습니다."),
    ;

    private final int status;
    private final String code;
    private final String message;
}
