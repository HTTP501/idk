package com.ssafy.idk.domain.account.dto.response;

import com.ssafy.idk.domain.account.dto.request.AccountCreateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class AccountCreateResponseDto {

    private String accountNumber;
    private LocalDateTime accountCreatedAt;

    public static AccountCreateResponseDto of(
            final String accountNumber,
            final LocalDateTime accountCreatedAt
    ) {
        return AccountCreateResponseDto.builder()
                .accountNumber(accountNumber)
                .accountCreatedAt(accountCreatedAt)
                .build();
    }
}
