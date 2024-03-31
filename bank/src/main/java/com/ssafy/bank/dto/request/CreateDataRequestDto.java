package com.ssafy.bank.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDataRequestDto {

    private String name;
    private String birthDate;
    private String phoneNumber;
    private String connectionInformation;
}
