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
    
    // ACCOUNT
    ACCOUNT_CREATE_SUCCESS(201, "A001", "계좌를 생성했습니다"),
    ACCOUNT_GET_SUCCESS(200, "A002", "계좌를 조회했습니다");
    

    private final int status;
    private final String code;
    private final String message;
}
