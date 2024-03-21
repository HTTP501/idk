package com.ssafy.idk.domain.piggybank.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class PiggyBankException extends RuntimeException {

    private final ErrorCode errorCode;

    public PiggyBankException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
