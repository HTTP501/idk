package com.ssafy.ca.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class GetCIResponseDto {

    private String connectionInformation;

    public static GetCIResponseDto of(
            String connectionInformation
    ) {
        return GetCIResponseDto.builder()
                .connectionInformation(connectionInformation)
                .build();
    }
}
