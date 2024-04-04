package com.ssafy.idk.domain.autodebit.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AutoDebitCreateResponseDto {

    private Long autoDebitId;

    public static AutoDebitCreateResponseDto of(
            Long autoDebitId
    ) {
        return AutoDebitCreateResponseDto.builder()
                .autoDebitId(autoDebitId)
                .build();
    }
}
