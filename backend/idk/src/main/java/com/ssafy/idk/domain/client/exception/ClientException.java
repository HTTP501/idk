package com.ssafy.idk.domain.client.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class ClientException extends RuntimeException {

    private final ErrorCode errorCode;
    public ClientException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}