package com.ssafy.idk.domain.autodebit.entity;

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
@Table(name = "AUTO_DEBIT")
public class AutoDebit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auto_debit_id") @NotNull
    private Long autoDebitId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") @NotNull
    private Account account;

    @Column(length = 20, name = "finance_agency") @NotNull
    private String financeAgency;

    @Column(length = 20, name = "agency_number") @NotNull
    private String agencyNumber;

    @Column(length = 20, name = "payer_number") @NotNull
    private String payerNumber;

    @Column(name = "created_at") @NotNull
    private LocalDateTime createdAt;

    @Column(name = "updated_at") @NotNull
    private LocalDateTime updatedAt;

}
