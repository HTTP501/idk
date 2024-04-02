package com.ssafy.idk.domain.salary.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class SalaryException extends RuntimeException {

    private final ErrorCode errorCode;

    public SalaryException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
