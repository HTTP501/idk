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

    private List<AutoTransferInfoDto> assestInfoList;

    public static AutoTransferInfoListResponseDto of(
            List<AutoTransferInfoDto> assestInfoList
    ) {
        return AutoTransferInfoListResponseDto.builder()
                .assestInfoList(assestInfoList)
                .build();
    }
}
