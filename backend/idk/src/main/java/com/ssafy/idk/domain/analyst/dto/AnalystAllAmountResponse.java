package com.ssafy.idk.domain.Analyst.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AnalystAllAmountResponse {

    private List<AnalystAllAmount> amountList;

    public static AnalystAllAmountResponse of(
            List<AnalystAllAmount> amountList
    ) {
        return AnalystAllAmountResponse.builder()
                .amountList(amountList)
                .build();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class AnalystAllAmount {
        private Integer year;
        private Integer month;
        private Long amount;
    }
}
