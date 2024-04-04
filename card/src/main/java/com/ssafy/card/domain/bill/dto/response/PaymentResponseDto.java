package com.ssafy.card.domain.bill.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class PaymentResponseDto {

    private String companyName;
    private String companyCode;
    private String cardNumber;
    private Long chargeAmt;
    private LocalDate payDueDate;
    private String accountNumber;
    private String orgName;
    private String accountOrgCode;

    public static PaymentResponseDto of(
            String companyName,
            String companyCode,
            String cardNumber,
            Long chargeAmt,
            LocalDate payDueDate,
            String accountNumber,
            String orgName,
            String accountOrgCode
    ) {
        return PaymentResponseDto.builder()
                .companyName(companyName)
                .companyCode(companyCode)
                .cardNumber(cardNumber)
                .chargeAmt(chargeAmt)
                .payDueDate(payDueDate)
                .accountNumber(accountNumber)
                .orgName(orgName)
                .accountOrgCode(accountOrgCode)
                .build();
    }
}
