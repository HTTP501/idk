package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class CertifyResponseFromMydataDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {
        List<Map<String, String>> certifiedResult;
    }
}
