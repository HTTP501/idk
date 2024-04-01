package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class CertifyRequestToBankDto {

    private String connectionInformation;
    private String receiverOrgCode;
    private String providerOrgCode;
    private String clientId;
    private String clientSecret;
    private Map<String, String> consent;
    private String signedConsent;
    public static CertifyRequestToBankDto of(
            String connectionInformation,
            String receiverOrgCode,
            String providerOrgCode,
            String clientId,
            String clientSecret,
            Map<String, String> consent,
            String signedConsent
    ) {
        return CertifyRequestToBankDto.builder()
                .connectionInformation(connectionInformation)
                .receiverOrgCode(receiverOrgCode)
                .providerOrgCode(providerOrgCode)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .consent(consent)
                .signedConsent(signedConsent)
                .build();
    }
}
