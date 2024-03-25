package com.ssafy.idk.domain.Analyst.dto;

import com.ssafy.idk.domain.Analyst.domain.Analyst;
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
