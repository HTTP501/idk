package com.ssafy.idk.domain.account.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class TransferException extends RuntimeException {

    private final ErrorCode errorCode;
    public TransferException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
