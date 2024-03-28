package com.ssafy.idk.domain.mydata.dto.response;

import com.ssafy.idk.domain.mydata.entity.Asset;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class MydataGetResponseDto {

    private List<MydataAssetDto> assetInfo;

    public static MydataGetResponseDto of(
            List<MydataAssetDto> assetInfo
    ) {
        return MydataGetResponseDto.builder()
                .assetInfo(assetInfo)
                .build();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class MydataAssetDto {

        private String orgName;
        private List<Asset> assetList;

        @Builder
        @Getter
        @AllArgsConstructor
        public static class AssetDto {
            private String account;

        }

    }
}
