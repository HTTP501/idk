package com.ssafy.idk.domain.account.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TransferRequestDto {

    private Long receiverId;
    private String accountNumber;
    private String transferBank;
    private Long transferAmount;
    private String receiverPaymentContent;
    private String myPaymentContent;
}
