package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketDepositResponseDto {

    private Long pocketId;
    private Long balance;
    private boolean isDeposited;

    public static PocketDepositResponseDto of(
            Long pocketId,
            Long balance,
            boolean isDeposited
    ) {
        return PocketDepositResponseDto.builder()
                .pocketId(pocketId)
                .balance(balance)
                .isDeposited(isDeposited)
                .build();
    }
}
