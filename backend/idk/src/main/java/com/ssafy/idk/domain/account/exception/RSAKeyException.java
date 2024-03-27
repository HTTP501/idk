package com.ssafy.idk.domain.account.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class RSAKeyException extends RuntimeException {

    private final ErrorCode errorCode;
    public RSAKeyException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
