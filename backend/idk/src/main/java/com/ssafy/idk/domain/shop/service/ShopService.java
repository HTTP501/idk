package com.ssafy.idk.domain.shop.service;

import com.ssafy.idk.domain.account.repository.TransactionRepository;
import com.ssafy.idk.domain.account.service.AccountService;
import com.ssafy.idk.domain.shop.entity.Item;
import com.ssafy.idk.domain.shop.dto.response.ItemResponseDto;
import com.ssafy.idk.domain.shop.exception.ItemException;
import com.ssafy.idk.domain.shop.repository.ItemRepository;
import com.ssafy.idk.domain.member.service.AuthenticationService;
import com.ssafy.idk.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopService {

    private final ItemRepository itemRepository;
    private final AccountService accountService;
    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;

    public List<ItemResponseDto> getItemListOfCategory(int category) {
        List<Item> itemList = itemRepository.findAllByCategory(category);

        if(itemList.isEmpty()) throw new ItemException(ErrorCode.ITEM_CATEGORY_NOT_FOUND);

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
