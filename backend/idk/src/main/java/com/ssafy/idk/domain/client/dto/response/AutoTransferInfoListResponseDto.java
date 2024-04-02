package com.ssafy.idk.domain.client.dto.response;

import com.ssafy.idk.domain.member.dto.response.TransactionPushResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AutoTransferInfoListResponseDto {

    private List<AutoTransferInfoDto> assetInfoList;

    public static AutoTransferInfoListResponseDto of(
            List<AutoTransferInfoDto> assetInfoList
    ) {
        return AutoTransferInfoListResponseDto.builder()
                .assetInfoList(assetInfoList)
                .build();
    }
}
