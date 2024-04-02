package com.ssafy.idk.domain.pocket.dto.response;

import com.ssafy.idk.domain.pocket.entity.Pocket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class PocketTransactionResponseDto {

    private Long pocketTransactionId;
    private Long pocketId;
    private LocalDateTime createdAt;
    private Long amount;
    private Long balance;
    private String content;

    public static PocketTransactionResponseDto of(
            Long pocketTransactionId,
            Long pocketId,
            LocalDateTime createdAt,
            Long amount,
            Long balance,
            String content
    ) {
        return PocketTransactionResponseDto.builder()
                .pocketTransactionId(pocketTransactionId)
                .pocketId(pocketId)
                .createdAt(createdAt)
                .amount(amount)
                .balance(balance)
                .content(content)
                .build();
    }
}
