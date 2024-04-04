package com.ssafy.idk.domain.salary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class SalaryResponseDto {

    private Long salaryId;
    private String accountNum;
    private Integer salaryDay;
    private String companyName;
    private Long amount;

    public static SalaryResponseDto of(
            Long salaryId,
            String accountNum,
            Integer salaryDay,
            String companyName,
            Long amount
    ) {
        return SalaryResponseDto.builder()
                .salaryId(salaryId)
                .accountNum(accountNum)
                .salaryDay(salaryDay)
                .companyName(companyName)
                .amount(amount)
                .build();
    }
}
