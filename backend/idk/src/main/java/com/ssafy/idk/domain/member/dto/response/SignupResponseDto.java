package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SignupResponseDto {

    private Long memberId;
    private String accessToken;

    public static SignupResponseDto of(
            Long memberId,
            String accessToken
    ) {
        return SignupResponseDto.builder()
                .memberId(memberId)
                .accessToken(accessToken)
                .build();
    }
}
