package com.ssafy.ca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignResponseDto {

    private String signedData;

    public static SignResponseDto of(
            String signedData
    ) {
        return SignResponseDto.builder()
                .signedData(signedData)
                .build();
    }
}
