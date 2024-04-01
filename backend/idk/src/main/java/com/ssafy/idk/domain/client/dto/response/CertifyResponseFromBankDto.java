package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class CertifyResponseFromBankDto {

    private Data data;

    @Getter
    public static class Data {
        String accessToken;
    }
}
