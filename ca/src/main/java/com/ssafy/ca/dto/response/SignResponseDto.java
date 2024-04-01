package com.ssafy.ca.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class SignResponseDto {

    private List<Map<String, String>> signedInfoList;


    public static SignResponseDto of(
            List<Map<String, String>> signedInfoList
    ) {
        return SignResponseDto.builder()
                .signedInfoList(signedInfoList)
                .build();
    }
}
