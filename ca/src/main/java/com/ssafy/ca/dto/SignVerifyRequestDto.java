package com.ssafy.ca.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignVerifyRequestDto {

    private String connectionInformation;
    private String digitalSignature;
    private String orgCode;
}
