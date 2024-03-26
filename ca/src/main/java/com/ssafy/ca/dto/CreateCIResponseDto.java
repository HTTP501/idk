package com.ssafy.ca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreateCIResponseDto {

    private String connectionInformation;

    public static CreateCIResponseDto of(
            String connectionInformation
    ) {
        return CreateCIResponseDto.builder()
                .connectionInformation(connectionInformation)
                .build();
    }
}
