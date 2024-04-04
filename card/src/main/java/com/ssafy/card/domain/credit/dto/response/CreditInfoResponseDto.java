package com.ssafy.card.domain.credit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreditInfoResponseDto {

    private Long creditId;
    private String cardNumber;

    public static CreditInfoResponseDto of(
            Long creditId,
            String cardNumber
    ) {
        return CreditInfoResponseDto.builder()
                .creditId(creditId)
                .cardNumber(cardNumber)
                .build();
    }
}
