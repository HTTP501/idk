package com.ssafy.idk.domain.piggybank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankCreateResponseDto {

    private Long piggyBankId;
    private Long piggyBankBalance;
    private Long accountBalance;

    public static PiggyBankCreateResponseDto of (
            final Long piggyBankId,
            final Long piggyBankBalance,
            final Long accountBalance
    ) {
        return PiggyBankCreateResponseDto.builder()
                .piggyBankId(piggyBankId)
                .piggyBankBalance(piggyBankBalance)
                .accountBalance(accountBalance)
                .build();
    }

}
