package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketTargetSavingCreateResponseDto {

    private Long pocketId;
    private String name;
    private Long target;

    public static PocketTargetSavingCreateResponseDto of(
            Long pocketId,
            String name,
            Long target
    ) {
        return PocketTargetSavingCreateResponseDto.builder()
                .pocketId(pocketId)
                .name(name)
                .target(target)
                .build();
    }
}
