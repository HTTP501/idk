package com.ssafy.idk.domain.targetsaving.dto.response;

import com.ssafy.idk.domain.piggybank.dto.response.PiggyBankDeleteResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TargetSavingDeleteResponseDto {

    private Long accountBalance;

    public static TargetSavingDeleteResponseDto of (
            Long accountBalance
    ) {
        return TargetSavingDeleteResponseDto.builder()
                .accountBalance(accountBalance)
                .build();
    }
}
