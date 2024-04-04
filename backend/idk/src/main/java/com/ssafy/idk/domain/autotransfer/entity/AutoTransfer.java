package com.ssafy.idk.domain.autotransfer.entity;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.member.repository.MemberRepository;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "AUTO_TRANSFER")
public class AutoTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auto_transfer_id") @NotNull
    private Long autoTransferId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") @NotNull
    private Account account;

    @Column(length = 20, name = "name") @NotNull
    private String name;

    @Column(length = 14, name = "to_account") @NotNull
    private String toAccount;

    @Column(length = 10, name = "to_account_bank") @NotNull
    private String toAccountBank;

    @Column(name = "start_year_month") @NotNull
    private LocalDate startYearMonth;

    @Column(name = "end_year_month") @NotNull
    private LocalDate endYearMonth;

    @Column(name = "amount") @NotNull
    private Long amount;

    @Column(name = "date") @NotNull
    private Integer date;

    @Column(name = "created_at") @NotNull
    private LocalDateTime createdAt;

    @Column(name = "updated_at") @NotNull
    private LocalDateTime updatedAt;

    @Column(length = 10, name = "show_recipient_bank_account") @NotNull
    private String showRecipientBankAccount;

    @Column(length = 10, name = "show_my_bank_account") @NotNull
    private String showMyBankAccount;

    @OneToOne(mappedBy = "autoTransfer", cascade = CascadeType.REMOVE)
    @JoinColumn(name = "pocket_id")
    private Pocket pocket;

    @PrePersist
    public void prePresist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}