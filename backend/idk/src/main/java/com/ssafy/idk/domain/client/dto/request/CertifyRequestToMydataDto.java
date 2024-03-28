package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CertifyRequestToMydataDto {

    public static CertifyRequestToMydataDto of(
    ) {
        return CertifyRequestToMydataDto.builder()
                .build();
    }
}
