package com.ssafy.bank.exception;

import com.ssafy.bank.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class BankException extends RuntimeException {

    private final ErrorCode errorCode;

    public BankException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
