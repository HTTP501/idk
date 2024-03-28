package com.ssafy.idk.domain.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {

    private String name;
    private String birthDate;
    private String pin;
    private String phoneNumber;
    private Boolean hasBiometric;
}