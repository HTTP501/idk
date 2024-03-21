package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignupResponseDto {

    private String accessToken;

    public static SignupResponseDto of(
            String accessToken
    ) {
        return SignupResponseDto.builder()
                .accessToken(accessToken)
                .build();
    }
}
