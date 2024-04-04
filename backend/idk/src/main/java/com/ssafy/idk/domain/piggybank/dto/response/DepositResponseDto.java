package com.ssafy.idk.domain.piggybank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class DepositResponseDto {

    private Long piggyBankTransactionId;
    private List<PiggyBankTransactionResponseDto> arrayTransaction;

    public static DepositResponseDto of(
            Long piggyBankTransactionId,
            List<PiggyBankTransactionResponseDto> arrayTransaction
    ) {
        return DepositResponseDto.builder()
                .piggyBankTransactionId(piggyBankTransactionId)
                .arrayTransaction(arrayTransaction)
                .build();
    }
}
