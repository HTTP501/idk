package com.ssafy.idk.domain.analyst.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AnalystCurrentMonthAmountResponse {

    public static AnalystCurrentMonthAmountResponse of(
    ) {
        return AnalystCurrentMonthAmountResponse.builder()
                .build();
    }

}
