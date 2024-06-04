package com.ssafy.bank.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AccountInfoListResponseDto {

    private List<AccountInfoResponseDto> accountList;

    public static AccountInfoListResponseDto of(List<AccountInfoResponseDto> accountList) {
        return AccountInfoListResponseDto.builder()
                .accountList(accountList)
                .build();
    }
}
