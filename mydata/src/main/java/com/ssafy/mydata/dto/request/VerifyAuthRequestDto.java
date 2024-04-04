package com.ssafy.mydata.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyAuthRequestDto {

    private String clientId;
    private String clientSecret;
    private String orgCode;
    private String authority;
}
