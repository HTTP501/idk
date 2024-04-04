package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MemberInfoResponseDto {

    private Boolean transactionPushEnabled;
    private Boolean autoTransferPushEnabled;

    public static MemberInfoResponseDto of(
            Boolean transactionPushEnabled,
            Boolean autoTransferPushEnabled
    ) {
        return MemberInfoResponseDto.builder()
                .transactionPushEnabled(transactionPushEnabled)
                .autoTransferPushEnabled(autoTransferPushEnabled)
                .build();
    }
}
