package com.ssafy.card.domain.digitalsigniture.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AuthenticationResponseDto {

    private String accessToken;

    public static AuthenticationResponseDto of(String accessToken) {
        return AuthenticationResponseDto.builder()
                .accessToken(accessToken)
                .build();
    }
}
