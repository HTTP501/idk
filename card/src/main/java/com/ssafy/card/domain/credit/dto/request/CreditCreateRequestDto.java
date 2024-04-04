package com.ssafy.card.domain.credit.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreditCreateRequestDto {

    private String connectionInformation;
    private String cardCompanyOrgCode;
    private String accountNum;
    private String accountOrgCode;
    private String chargeDay;

}
