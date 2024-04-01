package com.ssafy.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@AllArgsConstructor
public class VerifyAuthResponseDto {

    public static VerifyAuthResponseDto of() {
        return VerifyAuthResponseDto.builder()
                .build();
    }

}
