package com.ssafy.card.domain.credit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CreditArrayResponseDto {

    private List<CreditInfoResponseDto> arrayCredit;

    public static CreditArrayResponseDto of(
            List<CreditInfoResponseDto> arrayCredit
    ) {
        return CreditArrayResponseDto.builder()
                .arrayCredit(arrayCredit)
                .build();
    }
}
