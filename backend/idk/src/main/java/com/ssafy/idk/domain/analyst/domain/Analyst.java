package com.ssafy.idk.domain.analyst.domain;

import com.ssafy.idk.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)

@Table(name="analyst")
public class Analyst {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analystId;

    @Column(name = "year")
    private Integer year;

    @Column(name = "month")
    private Integer month;

    @Column(name = "total_amount")
    private Long totalAmount;

    @Column(name = "total_common_amount")
    private Long totalCommonAmount;

    @Column(name = "fixed_auto_transfer_amount")
    private Long fixedAutoTransferAmount;

    @Column(name = "fixed_mydata_card_amount")
    private Long fixedMyDataCardAmount;

    @Column(name = "fixed_utility_amount")
    private Long fixedUtilityAmount;

    @Column(name = "piggy_amount")
    private Long piggyAmount;

    @Column(name = "save_amount")
    private Long saveAmount;

    @Column(name = "common_food_amount")
    private Long commonFoodAmount;

    @Column(name = "common_electronic_amount")
    private Long commonElectronicAmount;

    @Column(name = "common_beauty_amount")
    private Long commonBeautyAmount;

    @Column(name = "common_clothes_amount")
    private Long commonClothesAmount;

    @Column(name = "common_etc_amount")
    private Long commonEtcAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
