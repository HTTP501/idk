package com.ssafy.idk.domain.client.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SignResponseDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {
        private List<Map<String, String>> signedDataList;
    }
}
