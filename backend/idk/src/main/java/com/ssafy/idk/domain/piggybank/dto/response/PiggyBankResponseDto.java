package com.ssafy.idk.domain.piggybank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankResponseDto {

    private Long piggyBankId;
    private Long accountId;
    private Long balance;

    public static PiggyBankResponseDto of (
            Long piggyBankId,
            Long accountId,
            Long balance
    ) {
        return PiggyBankResponseDto.builder()
                .piggyBankId(piggyBankId)
                .accountId(accountId)
                .balance(balance)
                .build();
    }
}
