package com.ssafy.idk.domain.fcm.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;
@Getter
public class FcmException extends RuntimeException {

    private final ErrorCode errorCode;
    public FcmException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}