package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketUpdateIsActivatedResponseDto {

    private Long pocketId;
    private boolean isActivated;

    public static PocketUpdateIsActivatedResponseDto of(
            Long pocketId,
            boolean isActivated
    ) {
        return PocketUpdateIsActivatedResponseDto.builder()
                .pocketId(pocketId)
                .isActivated(isActivated)
                .build();
    }
}
