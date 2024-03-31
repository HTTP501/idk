package com.ssafy.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class VerifyAuthRequestDtoToMydata {

    private String clientId;
    private String clientSecret;
    private String orgCode;

    public static VerifyAuthRequestDtoToMydata of(
            String clientId,
            String clientSecret,
            String orgCode
    ) {
        return VerifyAuthRequestDtoToMydata.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .orgCode(orgCode)
                .build();
    }

}
