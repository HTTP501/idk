package com.ssafy.idk.domain.pocket.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class PocketException extends RuntimeException {
    private final ErrorCode errorCode;

    public PocketException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
