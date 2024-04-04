package com.ssafy.idk.domain.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AutoTransferRequestDto {

    private Long accountId;
    private Long receiverId;
    private String accountNumber;
    private String transferBank;
    private Long transferAmount;
    private String receiverPaymentContent;
    private String myPaymentContent;

    public static AutoTransferRequestDto of(
            Long accountId,
            Long receiverId,
            String accountNumber,
            String transferBank,
            Long transferAmount,
            String receiverPaymentContent,
            String myPaymentContent
    ) {
        return AutoTransferRequestDto.builder()
                .accountId(accountId)
                .receiverId(receiverId)
                .accountNumber(accountNumber)
                .transferBank(transferBank)
                .transferAmount(transferAmount)
                .receiverPaymentContent(receiverPaymentContent)
                .myPaymentContent(myPaymentContent)
                .build();
    }
}
