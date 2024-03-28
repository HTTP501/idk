package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketUpdateNameResponseDto {

    private Long pocketId;
    private String name;

    public static PocketUpdateNameResponseDto of(
            Long pocketId,
            String name
    ) {
        return PocketUpdateNameResponseDto.builder()
                .pocketId(pocketId)
                .name(name)
                .build();
    }
}
