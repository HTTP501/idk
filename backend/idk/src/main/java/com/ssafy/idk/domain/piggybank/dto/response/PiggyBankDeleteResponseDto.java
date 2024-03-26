package com.ssafy.idk.domain.piggybank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankDeleteResponseDto {

    private Long accountBalance;

    public static PiggyBankDeleteResponseDto of (
            Long accountBalance
    ) {
        return PiggyBankDeleteResponseDto.builder()
                .accountBalance(accountBalance)
                .build();
    }
}
