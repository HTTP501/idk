package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountOwnerResponseDto {

    private String name;

    public static AccountOwnerResponseDto of(String name) {
        return AccountOwnerResponseDto.builder()
                .name(name)
                .build();
    }
}
