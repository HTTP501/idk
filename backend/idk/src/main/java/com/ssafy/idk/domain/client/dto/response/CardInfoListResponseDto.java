package com.ssafy.idk.domain.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CardInfoListResponseDto {

    private Data data;

    @Getter
    @Setter
    public static class Data {

        private List<CardInfoDto> cardInfoDtoList;
    }
}
