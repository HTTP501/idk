package com.ssafy.idk.domain.shop.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReadyPaymentRequestDto {

    private int payType;
    private Long paymentId;
    private Long itemId;
}
