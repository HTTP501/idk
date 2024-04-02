package com.ssafy.idk.domain.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MydataAgreeResponseDto {

    private String connectionInformation;

    public static MydataAgreeResponseDto of(
    ) {
        return MydataAgreeResponseDto.builder()
                .build();
    }
}
