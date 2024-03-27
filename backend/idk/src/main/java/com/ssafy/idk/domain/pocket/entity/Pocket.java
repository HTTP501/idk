package com.ssafy.idk.domain.pocket.entity;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.piggybank.entity.PiggyBankTransaction;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "POCKET")
public class Pocket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pocket_id") @NotNull
    private Long pocketId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") @NotNull
    private Account account;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_saving_id")
    private Account targetSavingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auto_transfer_id")
    private Account autoTransferId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auto_debit_id")
    private Account autoDebitId;

    @Column(name = "name") @NotNull
    private String name;

    @Column(name = "target") @NotNull
    private Long target;

    @Column(name = "is_activated") @NotNull
    private boolean isActivated;

    @Column(name = "is_deposited") @NotNull
    private boolean isDeposited;

    @Column(name = "is_paid") @NotNull
    private boolean isPaid;

    @Column(name = "order") @NotNull
    private Integer order;

    @OneToMany(mappedBy = "pocket", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<PocketTransaction> arrayPocketTranscation = new ArrayList<>();

}