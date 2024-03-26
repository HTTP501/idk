package com.ssafy.idk.domain.shop.entity;

import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class OrderInfo implements Serializable {

    private Long itemId;
    private int method;
    private Long memberId;
    private String createdAt;

    public OrderInfo() {
    }

    public OrderInfo(Long itemId, int method, Long memberId) {
        this.itemId = itemId;
        this.method = method;
        this.memberId = memberId;
        this.createdAt = LocalDateTime.now().toString();
    }
}
