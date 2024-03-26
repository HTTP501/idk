package com.ssafy.ca.domain;

import com.ssafy.ca.dto.SignRequestDto.ConsentInfoDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignData {
    private String agreement;
    private String name;
    private String birthDate;
    private String phoneNumber;
    private String connectionInformation;
    private ConsentInfoDto consentInfo;
}