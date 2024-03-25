package com.ssafy.ca.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class SignResponseDto {

    private List<Map<String, String>> signedDataList;


    public static SignResponseDto of(
            List<Map<String, String>> signedDataList
    ) {
        return SignResponseDto.builder()
                .signedDataList(signedDataList)
                .build();
    }
}
