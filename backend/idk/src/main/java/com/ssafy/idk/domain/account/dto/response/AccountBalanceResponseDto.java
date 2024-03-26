package com.ssafy.idk.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountBalanceResponseDto {

    private Long accountId;
    private String accountName;
    private String accountNumber;
    private Long accountAvailableAmount;

    public static AccountBalanceResponseDto of(
            final Long accountId,
            final String accountName,
            final String accountNumber,
            final Long accountAvailableAmount
    ) {
        return AccountBalanceResponseDto.builder()
                .accountId(accountId)
                .accountName(accountName)
                .accountNumber(accountNumber)
                .accountAvailableAmount(accountAvailableAmount)
                .build();
    }
}
