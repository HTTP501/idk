package com.ssafy.idk.domain.targetsaving.entity;

import com.ssafy.idk.domain.account.entity.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="TARGET_SAVING")
public class TargetSaving {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "target_saving_id") @NotNull
    private Long targetSavingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") @NotNull
    private Account account;

    @Column(name = "name") @NotNull
    private String name;

    @Column(name = "date") @NotNull
    private Integer date;

    @Column(name = "term") @NotNull
    private Integer term;

    @Column(name = "monthly_amount") @NotNull
    private Long monthlyAmount;

    @Column(name = "goal_amount") @NotNull
    private Long goalAmount;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "created_at") @NotNull
    private LocalDateTime createdAt;

}
