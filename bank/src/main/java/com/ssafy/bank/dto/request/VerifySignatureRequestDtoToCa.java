package com.ssafy.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class VerifySignatureRequestDtoToCa {

    private String name;
    private String phoneNumber;
    private String connectionInformation;
    private Map<String, String> consent;
    private String signedConsent;

    public static VerifySignatureRequestDtoToCa of(
            String name,
            String phoneNumber,
            String connectionInformation,
            Map<String, String> consent,
            String signedConsent
    ) {
        return VerifySignatureRequestDtoToCa.builder()
                .name(name)
                .phoneNumber(phoneNumber)
                .connectionInformation(connectionInformation)
                .consent(consent)
                .signedConsent(signedConsent)
                .build();
    }
}
