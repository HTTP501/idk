package com.ssafy.idk.domain.account.domain;

import com.ssafy.idk.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "number", columnDefinition = "LONGTEXT")
    private String number;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "balance")
    private Long balance;

    @Column(name = "min_amount")
    private Long minAmount;

    @Column(name = "pay_date")
    private Integer payDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "account", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    List<Transaction> transactionList;

    public void updateName(String name) {
        this.name = name;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updatePayDate(int day) {
        this.payDate = day;
    }

    public void updateMinAmount(Long amount) {
        this.minAmount = amount;
    }

    public void updateTime() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePresist() {
        this.name = "IDK 우리나라 국민우대통장";
        this.minAmount = 0L;
        this.balance = 0L;
        this.payDate = 1;
    }
}
