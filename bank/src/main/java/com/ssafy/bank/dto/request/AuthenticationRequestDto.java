package com.ssafy.bank.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class AuthenticationRequestDto {

    private String connectionInformation;
    private String receiverOrgCode;
    private String providerOrgCode;
    private String clientId;
    private String clientSecret;
    private Map<String, String> consent;
    private String signedConsent;

}
