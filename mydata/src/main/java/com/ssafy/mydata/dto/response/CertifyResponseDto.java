package com.ssafy.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CertifyResponseDto {

    private List<CertifyResult> result;

    public static CertifyResponseDto of(
            List<CertifyResult> result
    ) {
        return CertifyResponseDto.builder()
                .result(result)
                .build();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class CertifyResult {
        private String orgCode;
        private String token;
    }
}
