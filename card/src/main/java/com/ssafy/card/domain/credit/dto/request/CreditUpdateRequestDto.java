package com.ssafy.card.domain.credit.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreditUpdateRequestDto {

    private String accountNum;
    private String accountOrgCode;

}
