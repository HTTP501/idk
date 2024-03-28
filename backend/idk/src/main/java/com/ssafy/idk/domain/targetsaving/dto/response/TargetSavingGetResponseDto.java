package com.ssafy.idk.domain.targetsaving.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TargetSavingGetResponseDto {

    private Long targetSavingId;
    private String name;
    private Integer date;
    private Integer term;
    private Integer count;
    private Long monthlyAmount;
    private Long goalAmount;

    public static TargetSavingGetResponseDto of(
            Long targetSavingId,
            String name,
            Integer date,
            Integer term,
            Integer count,
            Long monthlyAmount,
            Long goalAmount
    ) {
        return TargetSavingGetResponseDto.builder()
                .targetSavingId(targetSavingId)
                .name(name)
                .date(date)
                .term(term)
                .count(count)
                .monthlyAmount(monthlyAmount)
                .goalAmount(goalAmount)
                .build();
    }
}
