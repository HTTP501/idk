package com.ssafy.idk.domain.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketPaymentResponseDto {

    private Long pocketId;
    private String pocketName;
    private Long pocketBalance;
}
