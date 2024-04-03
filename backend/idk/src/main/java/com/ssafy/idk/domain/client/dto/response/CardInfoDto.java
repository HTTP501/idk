package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CardInfoDto {

    private String cardNumber;
    private Long chargeAmt;
    private LocalDate payDueDate;
    private String accountOrgCode;
    private String accountNumber;
}
