package com.ssafy.idk.domain.piggybank.domain;


import com.ssafy.idk.domain.account.domain.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="PIGGY_BANK")
public class PiggyBank {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "piggy_bank_id") @NotNull
    private Long piggyBankId;

    @JoinColumn(name = "account_id") @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    private Account account;

    @Column(name = "name") @NotNull
    private String name;

    @Column(name = "balance") @NotNull
    private Long balance;

    @Column(name = "create_at") @NotNull
    private LocalDateTime createAt;

    @PrePersist
    public void prePresist() {
        this.name = "저금통";
        this.createAt = LocalDateTime.now();
    }

}
