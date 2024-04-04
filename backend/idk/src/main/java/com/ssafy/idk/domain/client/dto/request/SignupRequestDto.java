package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignupRequestDto {

    private String name;
    private String phoneNumber;
    private String birthDate;
    private String connectionInformation;

    public static SignupRequestDto of(
            String name,
            String phoneNumber,
            String birthDate,
            String connectionInformation
    ) {
        return  SignupRequestDto.builder()
                .name(name)
                .phoneNumber(phoneNumber)
                .birthDate(birthDate)
                .connectionInformation(connectionInformation)
                .build();
    }
}
