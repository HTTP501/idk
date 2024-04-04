package com.ssafy.idk.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

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

    // TRANSFER
    TRANSFER_SUCCESS(201, "TR001", "해당 계좌로 송금했습니다"),
    TRANSFER_READY_SUCCESS(200, "TR002", "이체할 사용자를 조회했습니다"),

    // MEMBER
    MEMBER_SIGNUP_SUCCESS(201, "M001", "회원가입에 성공했습니다."),
    MEMEBER_RENEW_TOKEN_SUCCESS(200, "M002", "토큰 재발급에 성공했습니다."),
    MEMBER_LOGIN_PIN_SUCCESS(200, "M003", "PIN 로그인에 성공했습니다."),
    MEMBER_LOGIN_BIO_SUCCESS(200, "M004", "생체 인증 로그인 성공했습니다."),
    MEMBER_PHONE_VERIFICATION_REQUEST_SUCCESS(200, "M005", "휴대폰 본인 인증 요청 성공했습니다."),
    MEMBER_PHONE_CODE_VERIFICATION_SUCCESS(200, "M006", "휴대폰 인증 코드 검증에 성공했습니다."),
    MEMBER_AUTO_TRANSFER_PUSH_SUCCESS(200, "M007", "자동이체 알림 설정을 변경했습니다."),
    MEMBER_TRANSACTION_PUSH_SUCCESS(200, "M008", "입출금 알림 설정을 변경했습니다."),
    MEMBER_GET_INFO_SUCCESS(200, "M009", "회원 정보를 조회했습니다."),

    // PIGGY_BANK
    PIGGY_BANK_CREATE_SUCCESS(201, "PB201", "저금통 가입에 성공했습니다."),
    PIGGY_BANK_DELETE_SUCCESS(204, "PB202", "저금통 해지에 성공했습니다."),
    PIGGY_BANK_GET_SUCCESS(200, "PB203", "저금통을 조회했습니다."),
    PIGGY_BANK_GET_DETAIL_SUCCESS(200, "PB204", "저금통 입출금내역을 조회했습니다."),
    PIGGY_BANK_DEPOSIT_SUCCESS(201, "PB205", "저금통에 입금을 완료했습니다."),
    PIGGY_BANK_WITHDRAW_SUCCESS(201, "PB206", "저금통에서 출금을 완료했습니다."),

    // TARGET_SAVING
    TARGET_SAVING_CREATE_SUCCESS(201, "TS201", "목표저축 등록을 완료했습니다."),
    TARGET_SAVING_DELETE_SUCCESS(204, "TS202", "목표저축 해지를 완료했습니다."),
    TARGET_SAVING_GET_SUCCESS(200, "TS203", "해당 목표저축을 조회했습니다."),
    TARGET_SAVING_LIST_GET_SUCCESS(200, "TS204", "목표저축 목록을 조회했습니다."),

    // AUTO_TRANSFER
    AUTO_TRANSFER_CREATE_SUCCESS(201, "AT201", "자동이체 등록을 완료했습니다."),
    AUTO_TRANSFER_UPDATE_SUCCESS(200, "AT202", "자동이체 수정을 완료했습니다."),
    AUTO_TRANSFER_DELETE_SUCCESS(204, "AT203", "자동이체 삭제를 완료했습니다."),
    AUTO_TRANSFER_GET_SUCCESS(200, "AT204", "해당 자동이체 내역을 조회했습니다."),
    AUTO_TRANSFER_LIST_GET_SUCCESS(200, "AT205", "자동이체 목록을 조회했습니다."),

    // AUTO_DEBIT
    AUTO_DEBIT_CREATE_SUCCESS(201, "AD201", "자동결제 등록을 완료했습니다."),
    AUTO_DEBIT_DELETE_SUCCESS(204, "AD202", "자동결제 해지를 완료했습니다."),
    AUTO_DEBIT_GET_SUCCESS(200, "AD203", "해당 자동결제를 조회했습니다."),
    AUTO_DEBIT_LIST_GET_SUCCESS(200, "AD204", "자동결제 목록을 조회했습니다."),
    AUTO_DEBIT_PAYMENT_SUCCESS(200, "AD205", "자동결제 청구가 완료되었습니다."),

    // POCKET
    POCKET_CREATE_BY_TARGET_SAVING_SUCCESS(201, "P201", "목표저축을 통해 돈 포켓을 생성했습니다."),
    POCKET_CREATE_BY_AUTO_TRANSFER_SUCCESS(201, "P202", "자동이체를 통해 돈 포켓을 생성했습니다."),
    POCKET_CREATE_BY_CREDIT_MYDATA_SUCCESS(201, "P203", "신용카드 마이데이터를 통해 돈 포켓을 생성했습니다."),
    POCKET_GET_DETAIL_SUCCESS(200, "P204", "해당 돈 포켓을 조회했습니다."),
    POCKET_UPDATE_NAME_SUCCESS(200, "P205", "해당 돈 포켓의 이름을 수정했습니다."),
    POCKET_UPDATE_IS_ACTIVATED_SUCCESS(200, "P206", "해당 돈 포켓의 활성화 여부를 수정했습니다."),
    POCKET_AUTO_TRANSFER_DELETE_SUCCESS(204, "P207", "해당 자동이체 돈 포켓을 해지했습니다."),
    POCKET_DEPOSIT_SUCCESS(200, "P208", "해당 돈 포켓에 목표금액을 입금했습니다."),
    POCKET_WITHDRAWAL_SUCCESS(200, "P209", "해당 돈 포켓의 입금금액을 출금했습니다."),
    POCKET_GET_TRANSACTION_DETAIL_SUCCESS(200, "P210", "해당 돈 포켓 입출금 내역을 조회했습니다."),
    POCKET_GET_LIST_SUCCESS(200, "P211", "돈 포켓 목록을 조회했습니다."),
    POCKET_UPDATE_ORDER_SUCCESS(200, "P212", "돈 포켓 순서를 변경했습니다."),

    // Analyst
    ANALYST_GET_TOTAL_AMOUNT_SUCCESS(200, "AN001", "총 지출 금액을 조회했습니다."),
    ANALYST_GET_CARD_AMOUNT_SUCCESS(200, "AN002", "카드 지출 금액을 조회했습니다."),
    ANALYST_GET_UTILITY_AMOUNT_SUCCESS(200, "AN003", "공과금 지출 금액을 조회했습니다."),
    ANALYST_GET_COMMON_AMOUNT_SUCCESS(200, "AN004", "일반 지출 금액을 조회했습니다."),
    ANALYST_GET_MONTH_AMOUNT_SUCCESS(200, "AN005", "특정 월 지출 금액을 조회했습니다."),
    ANALYST_GET_CURRENT_MONTH_AMOUNT_SUCCESS(200, "AN006", "이번 달 지출 금액을 조회했습니다."),

    // PAYMENT
    PAYMENT_READY_SUCCESS(200, "P001", "결제 요청을 성공했습니다"),
    PAYMENT_APPROVAL_SUCCESS(200, "P002", "결제 승인을 성공했습니다"),

    // IDK_MYDATA
    IDK_MYDATA_AGREE_SUCCESS(200, "IM001", "마이데이터 동의 성공했습니다."),
    IDK_MYDATA_CONNECT_SUCCESS(200, "IM002", "마이데이터 자산 연결을 성공했습니다."),
    IDK_MYDATA_GET_SUCCESS(200, "IM003", "마이데이터 조회 성공했습니다."),

    // MYDATA
    MYDATA_AGREE_SUCCESS(200, "MD001", "마이데이터 동의 성공했습니다."),


    // TRANSACTION
    TRANSACTION_ATM_DEPOSIT_SUCCESS(201, "TR001", "ATM으로 입금했습니다"),
    TRANSACTION_ATM_WITHDRAW_SUCCESS(201, "TR002", "ATM으로 출금했습니다"),

    // SALARY
    SALARY_CREATE_SUCCESS(201, "SLR001", "월급을 생성했습니다."),
    SALARY_GET_SUCCESS(200, "SLR002", "월급을 조회했습니다."),
    SALARY_UPDATE_SUCCESS(200, "SLR003", "월급을 수정했습니다."),
    SALARY_DELETE_SUCCESS(204, "SLR004", "월급을 삭제했습니다."),

    // SYSTEM_DATE
    SYSTEM_DATE_GET_SUCCESS(200, "SD-201", "시스템 시간을 조회했습니다.")
    ;

    private final int status;
    private final String code;
    private final String message;
}
