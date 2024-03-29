package com.ssafy.card.domain.bill.entity;

import com.ssafy.card.domain.credit.entity.Credit;
import jakarta.persistence.*;
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
    @Column(name = "bill_id")
    private Long billId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credit_id")
    private Credit credit;

    @Column(name = "charge_amt")
    private Long chargeAmt;

    @Column(name = "paid_amt")
    private Long paidAmt;

    @Column(name = "is_paid")
    private boolean isPaid;

    @Column(length = 7, name = "charge_month")  // YYYY-MM
    private String chargeMonth;

    @Column(length = 2, name = "charge_day")  // DD
    private String chargeDay;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;

}
