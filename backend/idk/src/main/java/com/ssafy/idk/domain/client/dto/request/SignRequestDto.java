package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class SignRequestDto {

    private String connectionInformation;
    private List<Map<String, String>> consentList;

    public static SignRequestDto of(String connectionInformation, List<Map<String, String>> consentList) {
        return SignRequestDto.builder()
                .connectionInformation(connectionInformation)
                .consentList(consentList)
                .build();
    }
}
