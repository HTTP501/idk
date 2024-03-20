package com.ssafy.idk.domain.piggybank.domain;


import jakarta.persistence.*;
import lombok.*;

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

}
