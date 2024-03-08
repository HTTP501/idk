package com.ssafy.idk.domain.item.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class ItemException extends RuntimeException {

    private final ErrorCode errorCode;

    public ItemException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
