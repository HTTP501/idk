package com.ssafy.idk.domain.shop.controller;

import com.ssafy.idk.domain.shop.service.ShopService;
import com.ssafy.idk.global.result.ResultCode;
import com.ssafy.idk.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController()
@RequestMapping("/api/shop")
@Slf4j
public class ShopController {

    private final ShopService shopService;

    @Operation(summary = "카테고리별 상품 조회")
    @GetMapping("/category/{category}")
    public ResponseEntity<ResultResponse> getItemListOfCategory(@PathVariable("category") int category){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ITEM_CATEGORY_SUCCESS, shopService.getItemListOfCategory(category)));
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{itemId}")
    public ResponseEntity<ResultResponse> getItem(@PathVariable("itemId") Long itemId){
        return ResponseEntity.ok(ResultResponse.of(ResultCode.ITEM_SUCCESS, shopService.getItem(itemId)));
    }
}
