package com.ssafy.idk.domain.piggybank.entity;


import com.ssafy.idk.domain.account.entity.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "balance") @NotNull
    private Long balance;

    @Column(name = "create_at") @NotNull
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "piggyBank", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<PiggyBankTransaction> transactions = new ArrayList<>();

    public void deposit(Long amount) { // 입금
        this.balance += amount;
    }
    public void withdraw(Long amount) {
        this.balance -= amount;
    }


}
