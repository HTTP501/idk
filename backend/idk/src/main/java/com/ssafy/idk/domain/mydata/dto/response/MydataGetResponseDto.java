package com.ssafy.idk.domain.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class MydataGetResponseDto {

    private List<MydataAssetDto> assetInfoList;

    public static MydataGetResponseDto of(
            List<MydataAssetDto> assetInfoList
    ) {
        return MydataGetResponseDto.builder()
                .assetInfoList(assetInfoList)
                .build();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class MydataAssetDto {

        private String orgName;
        private List<AssetDto> assetInfo;

        public static MydataAssetDto of (String orgName, List<AssetDto> assetInfo) {
            return MydataAssetDto.builder()
                    .orgName(orgName)
                    .assetInfo(assetInfo)
                    .build();
        }

        @Builder
        @Getter
        @AllArgsConstructor
        public static class AssetDto {
            private String asset;
            private Long claimAmount;
            private Integer claimDate;
            private String designatedOrgName;
            private String designatedAssetNumber;
            private Boolean isLinked;

            public static AssetDto of(
                    String asset, Long claimAmount,
                    Integer claimDate, String designatedOrgName,
                    String designatedAssetNumber, Boolean isLinked
            ) {
                return AssetDto.builder()
                        .asset(asset)
                        .claimAmount(claimAmount)
                        .claimDate(claimDate)
                        .designatedOrgName(designatedOrgName)
                        .designatedAssetNumber(designatedAssetNumber)
                        .isLinked(isLinked)
                        .build();
            }
        }
    }
}
