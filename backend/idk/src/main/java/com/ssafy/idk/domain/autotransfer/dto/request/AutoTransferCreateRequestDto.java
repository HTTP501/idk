package com.ssafy.idk.domain.autotransfer.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class AutoTransferCreateRequestDto {

    private Long accountId;
    private String name;
    private String toAccount;
    private String toAccountBank;
    private Long amount;
    private Integer date;
    private String startYearMonth;
    private String endYearMonth;
    private String showRecipientBankAccount;
    private String showMyBankAccount;

}
