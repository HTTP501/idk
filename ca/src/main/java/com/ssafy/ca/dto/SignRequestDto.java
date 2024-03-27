package com.ssafy.ca.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SignRequestDto {

    private String agreement;

    // agreeINfo
    private String name;
    private String birthDate;
    private String phoneNumber;
    private String connectionInformation;

    // consentInfoList
    private List<ConsentInfoDto> consentInfoList;

    @Getter
    @Setter
    public static class ConsentInfoDto {
        private String orgCode;
        private String orgType;
    }
}


