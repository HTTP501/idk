package com.ssafy.ca.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignVerifyResponseDto {


    public static SignVerifyResponseDto of(
    ) {
        return SignVerifyResponseDto.builder()
                .build();
    }
}
