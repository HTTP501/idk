package com.ssafy.idk.domain.targetsaving.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class TargetSavingException extends RuntimeException {

    private final ErrorCode errorCode;

    public TargetSavingException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
