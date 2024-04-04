package com.ssafy.idk.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReadyTransferRequestDto {

    private String accountNumber;
    private String bankName;

    public static ReadyTransferRequestDto of(
            String accountNumber,
            String bankName
    ) {
        return ReadyTransferRequestDto.builder()
                .accountNumber(accountNumber)
                .bankName(bankName)
                .build();
    }
}
