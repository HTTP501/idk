package com.ssafy.idk.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TransferResponseDto {

    private Long transferAmount;
    private Long accountBalance;

    public static TransferResponseDto of(
            final Long transferAmount,
            final Long accountBalance
    ) {
        return TransferResponseDto.builder()
                .transferAmount(transferAmount)
                .accountBalance(accountBalance)
                .build();
    }
}
