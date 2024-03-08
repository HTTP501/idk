package com.ssafy.idk.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // ITEM
    ITEM_CATEGORY_NOT_FOUND(404, "I404", "해당 상품의 카테고리가 존재하지 않습니다"),
    ITEM_NOT_FOUND(404, "I404", "해당 상품이 존재하지 않습니다"),

    // ACCOUNT
    ACCOUNT_NOT_FOUND(404, "A404", "계좌가 존재하지 않습니다");

    // TRANSACTION

    private final int status;
    private final String code;
    private final String message;
}
