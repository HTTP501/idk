package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TransactionPushResponseDto {

    private Boolean transactionPushEnabled;

    public static TransactionPushResponseDto of(
            Boolean transactionPushEnabled
    ) {
        return TransactionPushResponseDto.builder()
                .transactionPushEnabled(transactionPushEnabled)
                .build();
    }
}
