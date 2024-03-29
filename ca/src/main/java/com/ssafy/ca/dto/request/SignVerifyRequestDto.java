package com.ssafy.ca.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignVerifyRequestDto {

    private String consentInfo;
    private String digitalSignature;
}
