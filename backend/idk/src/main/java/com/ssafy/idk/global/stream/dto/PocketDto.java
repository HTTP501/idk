package com.ssafy.idk.global.stream.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class PocketDto {

    private Long pocketId;
    private Boolean isActivated;
    private Boolean isPaid;
    private Boolean isDeposited;
    private Integer expectedDate;
    private Long target;

    public static PocketDto of(
            Long pocketId,
            Boolean isActivated,
            Boolean isPaid,
            Boolean isDeposited,
            Integer expectedDate,
            Long target
    ) {
        return PocketDto.builder()
                .pocketId(pocketId)
                .isActivated(isActivated)
                .isPaid(isPaid)
                .isDeposited(isDeposited)
                .expectedDate(expectedDate)
                .target(target)
                .build();
    }
}
