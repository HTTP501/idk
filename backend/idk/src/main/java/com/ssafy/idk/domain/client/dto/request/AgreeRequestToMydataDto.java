package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AgreeRequestToMydataDto {

    private String name;
    private String connectionInformation;

    public static AgreeRequestToMydataDto of(
            String name, String connectionInformation
    ) {
        return AgreeRequestToMydataDto.builder()
                .name(name)
                .connectionInformation(connectionInformation)
                .build();
    }
}
