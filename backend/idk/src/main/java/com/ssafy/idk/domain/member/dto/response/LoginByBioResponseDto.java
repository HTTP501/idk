package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LoginByBioResponseDto {

    private String accessToken;

    public static LoginByBioResponseDto of(
            String accessToken
    ) {
        return LoginByBioResponseDto.builder()
                .accessToken(accessToken)
                .build();
    }
}
