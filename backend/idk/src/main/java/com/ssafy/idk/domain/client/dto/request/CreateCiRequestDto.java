package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreateCiRequestDto {
    private String name;
    private String birthDate;
    private String phoneNumber;

    public static CreateCiRequestDto of(
            String name,
            String birthDate,
            String phoneNumber
    ) {
        return CreateCiRequestDto.builder()
                .name(name)
                .birthDate(birthDate)
                .phoneNumber(phoneNumber)
                .build();
    }
}
