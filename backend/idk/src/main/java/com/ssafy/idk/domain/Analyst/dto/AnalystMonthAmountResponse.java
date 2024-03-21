package com.ssafy.idk.domain.Analyst.dto;

import com.ssafy.idk.domain.Analyst.domain.Analyst;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AnalystMonthAmountResponse {

    private Integer year;
    private Integer month;
    private Long totalAmount;
    private Long totalCommonAmount;

    private AnalystTotalAmount totalAmountBreakdown;
    private AnalystCommonAmount totalCommonAmountBreakdown;

    public static AnalystMonthAmountResponse of(
            Analyst analyst
    ) {
        return AnalystMonthAmountResponse.builder()
                .year(analyst.getYear())
                .month(analyst.getMonth())
                .totalAmount(analyst.getTotalAmount())
                .totalCommonAmount(analyst.getTotalCommonAmount())
                .totalAmountBreakdown(AnalystTotalAmount.builder()
                        .fixedAmount(analyst.getFixedAutoTransferAmount() + analyst.getFixedMyDataCardAmount() + analyst.getFixedUtilityAmount())
                        .saveAmount(analyst.getSaveAmount())
                        .commonAmount(analyst.getTotalCommonAmount())
                        .piggyAmount(analyst.getPiggyAmount())
                        .build())
                .totalCommonAmountBreakdown(AnalystCommonAmount.builder()
                        .foodAmount(analyst.getCommonFoodAmount())
                        .electronicAmount(analyst.getCommonElectronicAmount())
                        .beautyAmount(analyst.getCommonBeautyAmount())
                        .clothesAmount(analyst.getCommonClothesAmount())
                        .etcAmount(analyst.getCommonEtcAmount())
                        .build())
                .build();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class AnalystTotalAmount {
        private Long fixedAmount;
        private Long saveAmount;
        private Long commonAmount;
        private Long piggyAmount;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class AnalystCommonAmount {
        private Long foodAmount;
        private Long electronicAmount;
        private Long beautyAmount;
        private Long clothesAmount;
        private Long etcAmount;
    }
}
