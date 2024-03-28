package com.ssafy.idk.domain.pocket.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketAutoTransferDeleteResponseDto {

    private Long accountId;
    private Long accountBalance;

    public static PocketAutoTransferDeleteResponseDto of(
            Long accountId,
            Long accountBalance
    ) {
        return PocketAutoTransferDeleteResponseDto.builder()
                .accountId(accountId)
                .accountBalance(accountBalance)
                .build();
    }
}
