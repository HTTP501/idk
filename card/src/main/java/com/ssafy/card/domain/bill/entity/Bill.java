package com.ssafy.card.domain.bill.entity;

import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.credit.entity.Credit;
import com.ssafy.card.domain.member.entity.Member;
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
@Table(name = "BILL")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id") @NotNull
    private Long billId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_id") @NotNull
    private Credit credit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id") @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id") @NotNull
    private Company company;

    @Column(name = "charge_amt") @NotNull
    private Long chargeAmt;

    @Column(name = "paid_amt") @NotNull
    private Long paidAmt;

    @Column(name = "is_paid") @NotNull
    private boolean isPaid;

    @Column(length = 2, name = "pay_due_date") @NotNull
    private LocalDate payDueDate;

    @Column(name = "created_at") @NotNull
    private LocalDateTime created_at;

    @Column(name = "updated_at") @NotNull
    private LocalDateTime updated_at;

}
