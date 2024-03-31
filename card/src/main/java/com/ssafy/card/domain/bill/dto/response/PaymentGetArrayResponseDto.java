package com.ssafy.card.domain.bill.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PaymentGetArrayResponseDto {

    private List<PaymentResponseDto> arrayPayment;

    public static PaymentGetArrayResponseDto of(
            List<PaymentResponseDto> arrayPayment
    ) {
        return PaymentGetArrayResponseDto.builder()
                .arrayPayment(arrayPayment)
                .build();
    }
}
