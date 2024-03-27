package com.ssafy.idk.domain.pocket.entity;

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
@Table(name = "POCKET_TRANSACTION")
public class PocketTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pocket_transaction_id") @NotNull
    private Long pocketTransactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pocket_id") @NotNull
    private Pocket pocket;

    @Column(name = "created_at") @NotNull
    private LocalDateTime createdAt;

    @Column(name = "amount") @NotNull
    private Long amount;

    @Column(name = "balance") @NotNull
    private Long balance;

    @Column(length = 20, name = "amount") @NotNull
    private String content;

}

