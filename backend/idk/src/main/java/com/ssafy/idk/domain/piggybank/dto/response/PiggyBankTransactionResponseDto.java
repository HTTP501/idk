package com.ssafy.idk.domain.piggybank.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankTransactionResponseDto {

    private Long amount;
    private Long balance;
    private String content;
    private LocalDateTime createAt;

    public static PiggyBankTransactionResponseDto of(
            Long amount,
            Long balance,
            String content,
            LocalDateTime createAt
    ) {
        return PiggyBankTransactionResponseDto.builder()
                .amount(amount)
                .balance(balance)
                .content(content)
                .createAt(createAt)
                .build();
    }
}
