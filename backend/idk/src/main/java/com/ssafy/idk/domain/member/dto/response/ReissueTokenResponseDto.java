package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ReissueTokenResponseDto {

    private String accessToken;

    public static ReissueTokenResponseDto of(
            String accessToken
    ) {
        return ReissueTokenResponseDto.builder()
                .accessToken(accessToken)
                .build();
    }
}
