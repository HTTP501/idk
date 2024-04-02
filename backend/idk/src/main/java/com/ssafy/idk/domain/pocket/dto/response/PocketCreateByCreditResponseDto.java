package com.ssafy.idk.domain.pocket.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketCreateByCreditResponseDto {

    private Long pocketId;
    private String name;
    private Long target;

    public static PocketCreateByCreditResponseDto of(
            Long pocketId,
            String name,
            Long target
    ) {
        return PocketCreateByCreditResponseDto.builder()
                .pocketId(pocketId)
                .name(name)
                .target(target)
                .build();
    }
}
