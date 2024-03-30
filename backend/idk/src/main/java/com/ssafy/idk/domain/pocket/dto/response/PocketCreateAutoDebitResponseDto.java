package com.ssafy.idk.domain.pocket.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketCreateAutoDebitResponseDto {

    private Long pocketId;
    private String name;
    private Long target;

    public static PocketCreateAutoDebitResponseDto of(
            Long pocketId,
            String name,
            Long target
    ) {
        return PocketCreateAutoDebitResponseDto.builder()
                .pocketId(pocketId)
                .name(name)
                .target(target)
                .build();
    }
}
