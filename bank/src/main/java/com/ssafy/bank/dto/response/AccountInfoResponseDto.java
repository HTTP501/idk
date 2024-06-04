package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountInfoResponseDto {

    private String accountNumber;

    public static AccountInfoResponseDto of(String accountNumber) {
        return AccountInfoResponseDto.builder()
                .accountNumber(accountNumber)
                .build();
    }
}
