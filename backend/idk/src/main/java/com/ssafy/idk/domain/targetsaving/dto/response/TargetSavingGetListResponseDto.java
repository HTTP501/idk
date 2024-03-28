package com.ssafy.idk.domain.targetsaving.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class TargetSavingGetListResponseDto {

    private List<TargetSavingGetResponseDto> arrayTargetSaving;

    public static TargetSavingGetListResponseDto of(
            List<TargetSavingGetResponseDto> arrayTargetSaving
    ) {
        return TargetSavingGetListResponseDto.builder()
                .arrayTargetSaving(arrayTargetSaving)
                .build();
    }
}
