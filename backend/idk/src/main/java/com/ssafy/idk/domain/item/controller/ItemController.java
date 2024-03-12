package com.ssafy.idk.domain.item.controller;

import com.ssafy.idk.domain.item.service.ItemService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/api/item")
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "카테고리별 상품 조회")
    @GetMapping("/category/{category}")
    public ResponseEntity<ResultResponse> getItemListOfCategory(@PathVariable("category") int category){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ITEM_CATEGORY_SUCCESS, itemService.getItemListOfCategory(category)));
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{itemId}")
    public ResponseEntity<ResultResponse> getItem(@PathVariable("itemId") Long itemId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ITEM_SUCCESS, itemService.getItem(itemId)));
    }
}
