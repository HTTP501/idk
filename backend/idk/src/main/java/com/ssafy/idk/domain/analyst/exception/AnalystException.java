package com.ssafy.idk.domain.analyst.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class AnalystException extends RuntimeException {
    private final ErrorCode errorCode;
    public AnalystException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
