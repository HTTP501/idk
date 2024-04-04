package com.ssafy.idk.domain.mydata.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@AllArgsConstructor
public class AgreeToMydataRequestDto {

    private String name;
    private String connectionInformation;

    public static AgreeToMydataRequestDto of(
            String name, String connectionInformation
    ) {
        return AgreeToMydataRequestDto.builder()
                .name(name)
                .connectionInformation(connectionInformation)
                .build();
    }
}
