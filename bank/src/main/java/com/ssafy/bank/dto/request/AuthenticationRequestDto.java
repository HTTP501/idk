package com.ssafy.bank.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequestDto {

    private String connectionInformation;
    private String receiverOrgCode;
    private String providerOrgCode;
    private String clientId;
    private String clientSecret;
    private String consentInfo;
    private String encodedSignature;

}
