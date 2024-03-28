package com.ssafy.idk.domain.targetsaving.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TargetSavingCreateResponseDto {
    
    private Long targetSavingId;
    private String name;
    private Integer date;
    private Integer term;
    private Long monthlyAmount;
    private Long goalAmount;

    public static TargetSavingCreateResponseDto of(
            Long targetSavingId,
            String name,
            Integer date,
            Integer term,
            Long monthlyAmount,
            Long goalAmount
    ) {
        return TargetSavingCreateResponseDto.builder()
                .targetSavingId(targetSavingId)
                .name(name)
                .date(date)
                .term(term)
                .monthlyAmount(monthlyAmount)
                .goalAmount(goalAmount)
                .build();
    }
}
