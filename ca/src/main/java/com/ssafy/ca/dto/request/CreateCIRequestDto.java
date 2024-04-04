package com.ssafy.ca.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCIRequestDto {

    private String name;
    private String birthDate;
    private String phoneNumber;
}
