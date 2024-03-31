package com.ssafy.card.domain.bill.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
public class PaymentResponseDto {

    private LocalDate payDueDate;
    private Long chargeAmt;

    public static PaymentResponseDto of(
            LocalDate payDueDate,
            Long chargeAmt
    ) {
        return PaymentResponseDto.builder()
                .payDueDate(payDueDate)
                .chargeAmt(chargeAmt)
                .build();
    }

}
