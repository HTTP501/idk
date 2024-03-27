package com.ssafy.idk.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class TransactionResponseDto {

    private Long transactionId;
    private String transactionContent;
    private Long transactionAmount;
    private Long transactionBalance;
    private LocalDateTime transactionCreatedAt;

    public static TransactionResponseDto of(
            final Long transactionId,
            final String transactionContent,
            final Long transactionAmount,
            final Long transactionBalance,
            final LocalDateTime transactionCreatedAt
    ) {
        return TransactionResponseDto.builder()
                .transactionId(transactionId)
                .transactionContent(transactionContent)
                .transactionAmount(transactionAmount)
                .transactionBalance(transactionBalance)
                .transactionCreatedAt(transactionCreatedAt)
                .build();
    }
}
