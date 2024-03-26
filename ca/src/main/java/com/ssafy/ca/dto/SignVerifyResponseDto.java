package com.ssafy.ca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignVerifyResponseDto {

    private boolean isVerified;

    public static SignVerifyResponseDto of(
            boolean isVerified
    ) {
        return SignVerifyResponseDto.builder()
                .isVerified(isVerified)
                .build();
    }
}
