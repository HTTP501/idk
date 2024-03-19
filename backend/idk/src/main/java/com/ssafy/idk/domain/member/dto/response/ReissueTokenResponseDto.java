package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ReissueTokenResponseDto {

    private Long memberId;
    private String accessToken;

    public static ReissueTokenResponseDto of(
            Long memberId,
            String accessToken
    ) {
        return ReissueTokenResponseDto.builder()
                .memberId(memberId)
                .accessToken(accessToken)
                .build();
    }
}
