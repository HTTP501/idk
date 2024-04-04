package com.ssafy.idk.domain.shop.entity;

import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class OrderInfo implements Serializable {

    private Long memberId;
    private Long itemId;
    private String createdAt;

    public OrderInfo() {
    }

    public OrderInfo(Long memberId, Long itemId) {
        this.memberId = memberId;
        this.itemId = itemId;
        this.createdAt = LocalDateTime.now().toString();
    }
}
