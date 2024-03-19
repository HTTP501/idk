package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class LoginByPinResponseDto {

    private Long memberId;
    private String accessToken;

    public static LoginByPinResponseDto of(
            Long memberId,
            String accessToken
    ) {
        return LoginByPinResponseDto.builder()
                .memberId(memberId)
                .accessToken(accessToken)
                .build();
    }
}
