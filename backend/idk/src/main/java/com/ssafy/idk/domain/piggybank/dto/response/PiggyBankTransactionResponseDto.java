package com.ssafy.idk.domain.piggybank.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class PiggyBankTransactionResponseDto {

    private Long piggyBankTransactionId;
    private Long amount;
    private Long balance;
    private String content;
    private LocalDateTime createdAt;

    public static PiggyBankTransactionResponseDto of(
            Long piggyBankTransactionId,
            Long amount,
            Long balance,
            String content,
            LocalDateTime createdAt
    ) {
        return PiggyBankTransactionResponseDto.builder()
                .piggyBankTransactionId(piggyBankTransactionId)
                .amount(amount)
                .balance(balance)
                .content(content)
                .createdAt(createdAt)
                .build();
    }
}
