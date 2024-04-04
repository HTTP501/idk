package com.ssafy.idk.domain.account.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class AccountException extends RuntimeException {

    private final ErrorCode errorCode;
    public AccountException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}