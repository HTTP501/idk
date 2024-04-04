package com.ssafy.ca.exception;

import com.ssafy.ca.global.error.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class CaException extends RuntimeException {
    private final ErrorCode errorCode;

    public CaException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
