package com.ssafy.idk.domain.analyst.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AnalystCurrentMonthAmoutnResponse {

    public static AnalystCurrentMonthAmoutnResponse of(
    ) {
        return AnalystCurrentMonthAmoutnResponse.builder()
                .build();
    }

}
