package com.ssafy.idk.domain.piggybank.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankDetailResponseDto {

    private Long piggyBankId;
    private Long accountId;
    private Long balance;
    private List<PiggyBankTransactionResponseDto> arrayTransaction;

    public static PiggyBankDetailResponseDto of(
            Long piggyBankId,
            Long accountId,
            Long balance,
            List<PiggyBankTransactionResponseDto> arrayTransaction
    ) {
        return PiggyBankDetailResponseDto.builder()
                .piggyBankId(piggyBankId)
                .accountId(accountId)
                .balance(balance)
                .arrayTransaction(arrayTransaction)
                .build();
    }
}
