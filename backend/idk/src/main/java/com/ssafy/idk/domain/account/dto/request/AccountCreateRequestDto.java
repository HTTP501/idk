package com.ssafy.idk.domain.account.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountCreateRequestDto {

    private String accountPassword;
    private String accountName;
    private int accountPayDate;
}
