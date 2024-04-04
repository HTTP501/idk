package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.StringTokenizer;

@Builder
@Getter
@AllArgsConstructor
public class CertifyRequestToMydataDto {

    private String clientId;
    private String clientSecret;

    private String connectionInformation;
    private String consentInfo;
    private String digitalSignature;

    public static CertifyRequestToMydataDto of(
            String clientId, String clientSecret,
            String connectionInformation, String consentInfo, String digitalSignature
    ) {
        return CertifyRequestToMydataDto.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .connectionInformation(connectionInformation)
                .consentInfo(consentInfo)
                .digitalSignature(digitalSignature)
                .build();
    }

}
