package com.ssafy.mydata.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {

    private String name;
    private String phoneNumber;
    private String birthDate;
    private String connectionInformation;
}
