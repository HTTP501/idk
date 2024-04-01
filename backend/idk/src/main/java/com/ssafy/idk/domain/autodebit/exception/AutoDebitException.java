package com.ssafy.idk.domain.autodebit.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class AutoDebitException extends RuntimeException {

    private final ErrorCode errorCode;

    public AutoDebitException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}

