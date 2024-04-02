package com.ssafy.idk.domain.pocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketWithdrawResponseDto {

    private Long pocketId;
    private Long pocketBalance;
    private Long accountBalance;
    private boolean isDeposited;

    public static PocketWithdrawResponseDto of(
            Long pocketId,
            Long pocketBalance,
            Long accountBalance,
            boolean isDeposited
    ) {
        return PocketWithdrawResponseDto.builder()
                .pocketId(pocketId)
                .pocketBalance(pocketBalance)
                .accountBalance(accountBalance)
                .isDeposited(isDeposited)
                .build();
    }
}
