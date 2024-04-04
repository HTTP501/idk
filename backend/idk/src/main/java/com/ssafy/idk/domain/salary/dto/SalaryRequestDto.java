package com.ssafy.idk.domain.salary.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SalaryRequestDto {

    private Long accountId;
    private Integer salaryDay;
    private String companyName;
    private Long amount;

}
