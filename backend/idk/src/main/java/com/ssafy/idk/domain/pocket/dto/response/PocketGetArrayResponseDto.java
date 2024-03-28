package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PocketGetArrayResponseDto {

    private List<PocketGetDetailResponseDto> arrayPocket;

    public static PocketGetArrayResponseDto of(
            List<PocketGetDetailResponseDto> arrayPocket
    ) {
        return PocketGetArrayResponseDto.builder()
                .arrayPocket(arrayPocket)
                .build();
    }
}
