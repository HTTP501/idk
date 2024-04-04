package com.ssafy.idk.domain.member.exception;

import com.ssafy.idk.global.error.ErrorCode;
import lombok.Getter;

@Getter
public class MemberException extends RuntimeException {

    private final ErrorCode errorCode;
    public MemberException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}