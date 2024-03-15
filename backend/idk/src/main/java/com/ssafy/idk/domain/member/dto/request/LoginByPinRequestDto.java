package com.ssafy.idk.domain.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginByPinRequestDto {

    private String phoneNumber;
    private String pin;

}