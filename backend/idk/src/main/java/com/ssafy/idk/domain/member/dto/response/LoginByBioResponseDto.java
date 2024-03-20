package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class LoginByBioResponseDto {

    private Long memberId;
    private String accessToken;

    public static LoginByBioResponseDto of(
            Long memberId,
            String accessToken
    ) {
        return LoginByBioResponseDto.builder()
                .memberId(memberId)
                .accessToken(accessToken)
                .build();
    }
}
