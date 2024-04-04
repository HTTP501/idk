package com.ssafy.card.global.error;

import lombok.Getter;

@Getter
public class CardServerException extends RuntimeException {

    private final ErrorCode errorCode;

    public CardServerException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
