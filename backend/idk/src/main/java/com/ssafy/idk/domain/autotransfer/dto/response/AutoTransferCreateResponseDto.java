package com.ssafy.idk.domain.autotransfer.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferCreateResponseDto {

    private Long autoTransferId;
    private String toAccount;
    private String toAccountBank;
    private Long amount;
    private Integer date;
    private LocalDate startYearMonth;
    private LocalDate endYearMonth;

    public static AutoTransferCreateResponseDto of(
            Long autoTransferId,
            String toAccount,
            String toAccountBank,
            Long amount,
            Integer date,
            LocalDate startYearMonth,
            LocalDate endYearMonth
    ) {
        return AutoTransferCreateResponseDto.builder()
                .autoTransferId(autoTransferId)
                .toAccount(toAccount)
                .toAccountBank(toAccountBank)
                .amount(amount)
                .date(date)
                .startYearMonth(startYearMonth)
                .endYearMonth(endYearMonth)
                .build();
    }
}
