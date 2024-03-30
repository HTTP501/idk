package com.ssafy.idk.domain.autodebit.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AutoDebitGetListResponseDto {

    private List<AutoDebitGetDetailResponseDto> arrayAutoDebitResponseDto;

    public static AutoDebitGetListResponseDto of(
            List<AutoDebitGetDetailResponseDto> arrayAutoDebitResponseDto
    ) {
        return AutoDebitGetListResponseDto.builder()
                .arrayAutoDebitResponseDto(arrayAutoDebitResponseDto)
                .build();
    }
}
