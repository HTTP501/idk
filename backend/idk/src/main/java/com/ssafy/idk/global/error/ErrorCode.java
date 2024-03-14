package com.ssafy.idk.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // ITEM
    ITEM_CATEGORY_NOT_FOUND(404, "I401", "해당 상품의 카테고리가 존재하지 않습니다"),
    ITEM_NOT_FOUND(404, "I402", "해당 상품이 존재하지 않습니다"),

    // ACCOUNT
    ACCOUNT_NOT_FOUND(404, "A401", "계좌가 존재하지 않습니다"),
    ACCOUNT_FAIL_DELETE(400, "A402", "계좌 해지를 실패했습니다"),
    ACCOUNT_FAIL_SAVE(400, "A403", "계좌 저장을 실패했습니다"),
    ACCOUNT_PWD_NOT_SAME(400, "A404", "계좌 비밀번호와 다릅니다");

    // TRANSACTION

    private final int status;
    private final String code;
    private final String message;
}
