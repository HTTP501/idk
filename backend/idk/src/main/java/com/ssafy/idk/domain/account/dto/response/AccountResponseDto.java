package com.ssafy.idk.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountResponseDto {

    private Long accountId;
    private String userName;
    private String accountNumber;
    private String accountName;
    private Long accountBalance;
    private Long accountMinAmount;
    private int accountPayDate;

    public static AccountResponseDto of(
            final Long accountId,
            final String userName,
            final String accountNumber,
            final String accountName,
            final Long accountBalance,
            final Long accountMinAmount,
            final int accountPayDate
    ) {
        return AccountResponseDto.builder()
                .accountId(accountId)
                .userName(userName)
                .accountNumber(accountNumber)
                .accountName(accountName)
                .accountBalance(accountBalance)
                .accountMinAmount(accountMinAmount)
                .accountPayDate(accountPayDate)
                .build();
    }
}
