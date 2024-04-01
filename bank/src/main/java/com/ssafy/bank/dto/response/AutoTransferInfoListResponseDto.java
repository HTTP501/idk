package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferInfoListResponseDto {

    private List<AutoTransferInfoResponseDto> autoTransferList;

    public static AutoTransferInfoListResponseDto of(List<AutoTransferInfoResponseDto> autoTransferList) {
        return AutoTransferInfoListResponseDto.builder()
                .autoTransferList(autoTransferList)
                .build();
    }
}
