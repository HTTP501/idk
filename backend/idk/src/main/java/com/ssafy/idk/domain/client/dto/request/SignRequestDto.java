package com.ssafy.idk.domain.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class SignRequestDto {

    private String connectionInformation;
    private String consentInfo;
}
