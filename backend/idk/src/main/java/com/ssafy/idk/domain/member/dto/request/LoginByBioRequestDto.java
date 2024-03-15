package com.ssafy.idk.domain.member.dto.request;

import com.ssafy.idk.domain.member.dto.response.LoginByPinResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginByBioRequestDto {

    private String phoneNumber;
}
