package com.ssafy.idk.domain.client.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class AutoTransferInfoResponseFromBankDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {

        private List<AutoTransferInfoDto> autoTransferList;
    }
}
