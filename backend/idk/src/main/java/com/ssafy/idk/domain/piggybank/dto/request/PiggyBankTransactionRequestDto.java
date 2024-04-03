package com.ssafy.idk.domain.piggybank.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PiggyBankTransactionRequestDto {

    private Long amount;

    public static PiggyBankTransactionRequestDto of(Long amount) {
        return PiggyBankTransactionRequestDto.builder().amount(amount).build();
    }
}
