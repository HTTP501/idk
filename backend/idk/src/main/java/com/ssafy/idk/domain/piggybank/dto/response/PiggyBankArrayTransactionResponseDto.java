package com.ssafy.idk.domain.piggybank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankArrayTransactionResponseDto {

    private List<PiggyBankTransactionResponseDto> arrayTransaction;

    public static PiggyBankArrayTransactionResponseDto of(
            List<PiggyBankTransactionResponseDto> arrayTransaction
    ) {
        return PiggyBankArrayTransactionResponseDto.builder()
                .arrayTransaction(arrayTransaction)
                .build();
    }
}
