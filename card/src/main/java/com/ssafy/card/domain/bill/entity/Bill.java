package com.ssafy.card.domain.bill.entity;

import com.ssafy.card.domain.credit.entity.Credit;
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

    @Column(name = "charge_amt") @NotNull
    private Long chargeAmt;

    @Column(name = "paid_amt") @NotNull
    private Long paidAmt;

    @Column(name = "is_paid") @NotNull
    private boolean isPaid;

    @Column(length = 7, name = "charge_month") @NotNull  // YYYY-MM
    private String chargeMonth;

    @Column(length = 2, name = "charge_day") @NotNull  // DD
    private String chargeDay;

    @Column(name = "created_at") @NotNull
    private LocalDateTime created_at;

    @Column(name = "updated_at") @NotNull
    private LocalDateTime updated_at;

}
