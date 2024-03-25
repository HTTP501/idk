package com.ssafy.idk.domain.piggybank.domain;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="PIGGY_BANK")
public class PiggyBank {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "piggy_bank_id")
    private Long piggyBankId;

    @JoinColumn(name = "account_id")
    private Long accountId;

    @Column(name = "name")
    private String name;

    @Column(name = "balance")
    private Long balance;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @PrePersist
    public void prePresist() {
        this.name = "저금통";
        this.createAt = LocalDateTime.now();
    }

}
