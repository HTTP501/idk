package com.ssafy.idk.domain.item.service;

import com.ssafy.idk.domain.item.domain.Item;
import com.ssafy.idk.domain.item.dto.response.ItemResponseDto;
import com.ssafy.idk.domain.item.exception.ItemException;
import com.ssafy.idk.domain.item.repository.ItemRepository;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItemService {

    private final ItemRepository itemRepository;

    public List<ItemResponseDto> getItemListOfCategory(int category) {
        List<Item> itemList = itemRepository.findAllByCategory(category);

        if(itemList.size() == 0) new ItemException(ErrorCode.ITEM_CATEGORY_NOT_FOUND);

        List<ItemResponseDto> itemResponseDtoList = new ArrayList<>();
        for(Item item : itemList) {
            itemResponseDtoList.add(ItemResponseDto.of(item.getItemId(), item.getShop(), item.getName(), item.getPrice()));
        }

        return itemResponseDtoList;
    }

    public ItemResponseDto getItem(Long itemId) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemException(ErrorCode.ITEM_NOT_FOUND));

        return ItemResponseDto.of(item.getItemId(), item.getShop(), item.getName(), item.getPrice());
    }
}
