package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferInfoRequestToBankDto {

    private String name;
    private String connectionInformation;


    public static AutoTransferInfoRequestToBankDto of(
            String name,
            String connectionInformation

    ) {
        return AutoTransferInfoRequestToBankDto.builder()
                .name(name)
                .connectionInformation(connectionInformation)
                .build();
    }
}
