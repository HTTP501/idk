package com.ssafy.idk.domain.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ItemResponseDto {

    private Long itemId;
    private String itemShop;
    private String itemName;
    private Long itemPrice;

    public static ItemResponseDto of(
            final Long itemId,
            final String itemShop,
            final String itemName,
            final Long itemPrice
    ) {
        return ItemResponseDto.builder()
                .itemId(itemId)
                .itemShop(itemShop)
                .itemName(itemName)
                .itemPrice(itemPrice)
                .build();
    }
}
