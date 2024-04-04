package com.ssafy.card.global.error;

import lombok.Getter;

@Getter
public class MydataException extends RuntimeException {

    private final ErrorCode errorCode;

    public MydataException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
