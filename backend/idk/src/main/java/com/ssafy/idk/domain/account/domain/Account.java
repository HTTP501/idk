package com.ssafy.idk.domain.account.domain;

import com.ssafy.idk.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@DynamicInsert
@Table(name="account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "number")
    private String number;

    @Column(name = "name")
    @ColumnDefault("'IDK 우리나라 국민우대통장'")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "balance")
    @ColumnDefault("0")
    private Long balance;

    @Column(name = "min_amount")
    @ColumnDefault("0")
    private Long minAmount;

    @Column(name = "pay_date")
    @ColumnDefault("1")
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
}
