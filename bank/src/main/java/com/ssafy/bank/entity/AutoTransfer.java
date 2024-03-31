package com.ssafy.bank.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.cglib.core.Local;
import org.springframework.cglib.core.LocalVariablesSorter;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="auto_transfer")
public class AutoTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private String amount;

    @Column(name = "designated_account_number")
    private String designatedAccountNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "scheduled_date")
    private Integer scheduledDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @JoinColumn(name = "org_code") @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Organization organization;
}
