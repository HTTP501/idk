package com.ssafy.ca.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class SignVerifyRequestDto {

    private String name;
    private String phoneNumber;
    private String connectionInformation;
    private Map<String, String> consent;
    private String signedConsent;
}
