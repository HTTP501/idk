package com.ssafy.idk.domain.targetsaving.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TargetSavingCreateRequestDto {

    private Long accountId;
    private String name;
    private Integer date;
    private Integer term;
    private Long monthlyAmount;
    private Long goalAmount;
    private Long itemId;

}
