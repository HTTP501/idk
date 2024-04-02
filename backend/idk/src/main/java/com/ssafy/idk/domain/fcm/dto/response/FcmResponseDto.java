package com.ssafy.idk.domain.fcm.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class FcmResponseDto {

    private String token;
    private String title;
    private String body;

    public static FcmResponseDto of (
            final String token,
            final String title,
            final String body
    ) {
        return FcmResponseDto.builder()
                .token(token)
                .title(title)
                .body(body)
                .build();
    }
}