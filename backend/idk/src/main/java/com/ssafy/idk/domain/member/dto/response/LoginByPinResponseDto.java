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

    private String accessToken;

    public static LoginByPinResponseDto of(
            String accessToken
    ) {
        return LoginByPinResponseDto.builder()
                .accessToken(accessToken)
                .build();
    }
}
