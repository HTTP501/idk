package com.ssafy.idk.domain.autodebit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AutoDebitPaymentResponseDto {

    private Long paidAmt;

}
