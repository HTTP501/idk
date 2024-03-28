package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetCiResponseDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {
        private String connectionInformation;
    }
}
