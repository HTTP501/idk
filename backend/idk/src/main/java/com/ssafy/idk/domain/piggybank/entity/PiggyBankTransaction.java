package com.ssafy.idk.domain.piggybank.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "PIGGY_BANK_TRANSACTION")
public class PiggyBankTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "piggy_bank_transaction_id")
    @NotNull
    private Long piggyBankTransactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "piggy_bank_id") @NotNull
    private PiggyBank piggyBank;

    @Column(name = "amount") @NotNull
    private Long amount;

    @Column(name = "balance") @NotNull
    private Long balance;

    @Column(name = "content") @NotNull
    private String content;

    @Column(name = "created_at") @NotNull
    private LocalDateTime createdAt;

}
