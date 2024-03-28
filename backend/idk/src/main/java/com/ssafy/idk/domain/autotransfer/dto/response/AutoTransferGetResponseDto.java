package com.ssafy.idk.domain.autotransfer.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferGetResponseDto {

    private Long autoTransferId;
    private String toAccount;
    private String toAccountBank;
    private LocalDate startYearMonth;
    private LocalDate endYearMonth;
    private Long amount;
    private Integer date;
    private String showRecipientBankAccount;
    private String showMyBankAccount;

    public static AutoTransferGetResponseDto of(
            Long autoTransferId,
            String toAccount,
            String toAccountBank,
            LocalDate startYearMonth,
            LocalDate endYearMonth,
            Long amount,
            Integer date,
            String showRecipientBankAccount,
            String showMyBankAccount
    ) {
        return AutoTransferGetResponseDto.builder()
                .autoTransferId(autoTransferId)
                .toAccount(toAccount)
                .toAccountBank(toAccountBank)
                .startYearMonth(startYearMonth)
                .endYearMonth(endYearMonth)
                .amount(amount)
                .date(date)
                .showRecipientBankAccount(showRecipientBankAccount)
                .showMyBankAccount(showMyBankAccount)
                .build();
    }
}
