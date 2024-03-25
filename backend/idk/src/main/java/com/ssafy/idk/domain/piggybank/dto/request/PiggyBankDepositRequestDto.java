package com.ssafy.idk.domain.piggybank.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PiggyBankDepositRequestDto {

    private Long piggyBankId;
    private Long amount;

}
