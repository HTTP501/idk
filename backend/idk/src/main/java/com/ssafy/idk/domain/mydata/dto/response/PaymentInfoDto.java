package com.ssafy.idk.domain.mydata.dto.response;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PaymentInfoDto {

    private String companyName;
    private String companyCode;
    private String cardNumber;
    private Long chargeAmt;
    private LocalDate payDueDate;
    private String accountNumber;
    private String orgName;
    private String accountOrgCode;

}
