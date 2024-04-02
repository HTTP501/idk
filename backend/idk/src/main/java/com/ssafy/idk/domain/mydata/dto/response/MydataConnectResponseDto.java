package com.ssafy.idk.domain.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MydataConnectResponseDto {

    private String connectionInformation;

    public static MydataConnectResponseDto of(
    ) {
        return MydataConnectResponseDto.builder()
                .build();
    }
}
