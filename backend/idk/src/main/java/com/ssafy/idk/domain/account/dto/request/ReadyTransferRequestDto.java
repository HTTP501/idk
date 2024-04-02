package com.ssafy.idk.domain.account.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReadyTransferRequestDto {

    private String accountNumber;
    private String bankName;

}
