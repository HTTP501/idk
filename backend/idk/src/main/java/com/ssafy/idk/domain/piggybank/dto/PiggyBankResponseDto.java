package com.ssafy.idk.domain.piggybank.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankResponseDto {

    private Long piggyBankId;
    private Long accountId;

    public static PiggyBankResponseDto of (
            final Long piggyBankId,
            final Long accountId
    ) {
        return PiggyBankResponseDto.builder()
                .piggyBankId(piggyBankId)
                .accountId(accountId)
                .build();
    }

}
