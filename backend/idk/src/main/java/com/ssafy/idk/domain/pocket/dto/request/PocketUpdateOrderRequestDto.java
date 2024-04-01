package com.ssafy.idk.domain.pocket.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class PocketUpdateOrderRequestDto {

    private List<Long> arrayPocketId;

}
