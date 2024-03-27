package com.ssafy.idk.domain.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhoneCodeVerificationRequestDto {

    private String phoneNumber;
    private String verificationCode;
}
