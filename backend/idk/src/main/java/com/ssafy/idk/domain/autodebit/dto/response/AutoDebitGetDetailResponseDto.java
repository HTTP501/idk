package com.ssafy.idk.domain.autodebit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AutoDebitGetDetailResponseDto {

    private final String financeAgency;
    private final String orgCode;
    private final String payerNumber;

    public static AutoDebitGetDetailResponseDto of(
            String financeAgency,
            String orgCode,
            String payerNumber
    ) {
        return AutoDebitGetDetailResponseDto.builder()
                .financeAgency(financeAgency)
                .orgCode(orgCode)
                .payerNumber(payerNumber)
                .build();
    }
}
