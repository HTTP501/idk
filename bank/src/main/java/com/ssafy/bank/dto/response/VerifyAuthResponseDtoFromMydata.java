package com.ssafy.bank.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
public class VerifyAuthResponseDtoFromMydata {

    private Data data;

    @Getter
    public static class Data {
        Boolean result;
    }
}
