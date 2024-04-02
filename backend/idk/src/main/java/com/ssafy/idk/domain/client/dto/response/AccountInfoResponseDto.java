package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;

@Getter
public class AccountInfoResponseDto {

    private Data data;

    @Getter
    public static class Data {
        private String accountNumber;
    }
}
