package com.ssafy.mydata.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientCertifyResponseDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {
        String token;
    }
}
