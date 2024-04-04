package com.ssafy.idk.domain.mydata.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class MydataException extends RuntimeException {

    private final ErrorCode errorCode;
    public MydataException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}