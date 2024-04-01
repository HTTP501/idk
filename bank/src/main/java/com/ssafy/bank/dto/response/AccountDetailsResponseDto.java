package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountDetailsResponseDto {

    private String bankName;
    private String orgCode;
    private String memberName;
    private String accountNumber;
    private Long balance;

    public static AccountDetailsResponseDto of(
            String bankName,
            String orgCode,
            String memberName,
            String accountNumber,
            Long balance
    ) {

        return AccountDetailsResponseDto.builder()
                .bankName(bankName)
                .orgCode(orgCode)
                .memberName(memberName)
                .accountNumber(accountNumber)
                .balance(balance)
                .build();
    }
}
