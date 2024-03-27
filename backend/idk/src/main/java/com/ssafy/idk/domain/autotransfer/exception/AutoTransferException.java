package com.ssafy.idk.domain.autotransfer.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class AutoTransferException extends RuntimeException {

    private final ErrorCode errorCode;

    public AutoTransferException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}