package com.ssafy.idk.domain.shop.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Column(name = "shop")
    private String shop;

    @Column(name = "category")
    private Integer category;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;
}
