package com.ssafy.idk.domain.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ReadyTransferResponseDto {

    private Long memberId;
    private String memberName;

    public static ReadyTransferResponseDto of(
            final Long memberId,
            final String memberName
    ) {
        return ReadyTransferResponseDto.builder()
                .memberId(memberId)
                .memberName(memberName)
                .build();
    }
}
