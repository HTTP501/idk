package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AccountOwnerRequestDto {

    private String name;

    public static AccountOwnerRequestDto of(String name) {
        return AccountOwnerRequestDto.builder()
                .name(name)
                .build();
    }
}
