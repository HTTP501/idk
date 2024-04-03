package com.ssafy.card.domain.client.dto.request;

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
    private String authority;

    public static VerifyAuthRequestDtoToMydata of(
            String clientId,
            String clientSecret,
            String orgCode,
            String authority
    ) {
        return VerifyAuthRequestDtoToMydata.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .orgCode(orgCode)
                .authority(authority)
                .build();
    }
}
