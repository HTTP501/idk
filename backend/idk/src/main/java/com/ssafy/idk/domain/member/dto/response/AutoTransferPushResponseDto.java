package com.ssafy.idk.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferPushResponseDto {

    private Boolean autoTransferPushEnabled;

    public static AutoTransferPushResponseDto of(
            Boolean autoTransferPushEnabled
    ) {
        return AutoTransferPushResponseDto.builder()
                .autoTransferPushEnabled(autoTransferPushEnabled)
                .build();
    }
}
