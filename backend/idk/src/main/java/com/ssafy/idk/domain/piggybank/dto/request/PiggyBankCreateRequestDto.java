package com.ssafy.idk.domain.piggybank.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PiggyBankCreateRequestDto {

    private Long accountId;
    private Long deposit;

}
