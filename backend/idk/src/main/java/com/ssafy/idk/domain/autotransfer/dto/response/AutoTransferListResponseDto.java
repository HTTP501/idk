package com.ssafy.idk.domain.autotransfer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferListResponseDto {

    private final List<AutoTransferGetResponseDto> arrayAutoTransfer;

    public static AutoTransferListResponseDto of(
            List<AutoTransferGetResponseDto> arrayAutoTransfer
    ) {
        return AutoTransferListResponseDto.builder()
                .arrayAutoTransfer(arrayAutoTransfer)
                .build();
    }
}
