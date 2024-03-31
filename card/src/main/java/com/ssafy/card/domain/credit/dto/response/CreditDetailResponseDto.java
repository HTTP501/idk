package com.ssafy.card.domain.credit.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreditDetailResponseDto {

    private Long creditId;
    private String accountNum;
    private String accountOrgCode;

    public static CreditDetailResponseDto of(
            Long creditId,
            String accountNum,
            String accountOrgCode
    ) {
        return CreditDetailResponseDto.builder()
                .creditId(creditId)
                .accountNum(accountNum)
                .accountOrgCode(accountOrgCode)
                .build();
    }
}
