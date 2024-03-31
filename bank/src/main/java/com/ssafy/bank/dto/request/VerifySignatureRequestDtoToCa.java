package com.ssafy.bank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class VerifySignatureRequestDtoToCa {

    private String name;
    private String phoneNumber;
    private String connectionInformation;
    private String consentInfo;
    private String digitalSignature;

    public static VerifySignatureRequestDtoToCa of(
            String name,
            String phoneNumber,
            String connectionInformation,
            String consentInfo,
            String digitalSignature
    ) {
        return VerifySignatureRequestDtoToCa.builder()
                .name(name)
                .phoneNumber(phoneNumber)
                .connectionInformation(connectionInformation)
                .consentInfo(consentInfo)
                .digitalSignature(digitalSignature)
                .build();
    }
}
