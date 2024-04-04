package com.ssafy.idk.domain.client.dto.response;

import com.ssafy.idk.domain.mydata.dto.response.PaymentInfoDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaymentInfoListDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {

        private List<PaymentInfoDto> paymentInfoDtoList;
    }
}
