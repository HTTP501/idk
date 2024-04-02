package com.ssafy.idk.domain.autodebit.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AutoDebitPaymentRequestDto {

    private String financeAgency;
    private String payerNumber;
    private Long chargeAmt;

}
