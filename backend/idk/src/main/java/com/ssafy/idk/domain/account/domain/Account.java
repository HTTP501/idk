package com.ssafy.idk.domain.account.domain;

import com.ssafy.idk.domain.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    @OneToOne
    @JoinColumn(name="member_id")
    private Member member;

    @Column(name = "number")
    @ColumnDefault("'1234567891010'")
    private String number;

    @Column(name = "name")
    @ColumnDefault("'IDK 우리나라 국민우대통장'")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "balance")
    @ColumnDefault("0L")
    private Long balance;

    @Column(name = "min_amount")
    @ColumnDefault("0L")
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

}
