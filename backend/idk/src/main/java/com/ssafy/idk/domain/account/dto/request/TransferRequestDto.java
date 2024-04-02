package com.ssafy.idk.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransferRequestDto {

    private Long receiverId;
    private String accountNumber;
    private String transferBank;
    private Long transferAmount;
    private String receiverPaymentContent;
    private String myPaymentContent;

    public static TransferRequestDto of(
            Long receiverId,
            String accountNumber,
            String transferBank,
            Long transferAmount,
            String receiverPaymentContent,
            String myPaymentContent
    ) {
        return TransferRequestDto.builder()
                .receiverId(receiverId)
                .accountNumber(accountNumber)
                .transferBank(transferBank)
                .transferAmount(transferAmount)
                .receiverPaymentContent(receiverPaymentContent)
                .myPaymentContent(myPaymentContent)
                .build();
    }
}
