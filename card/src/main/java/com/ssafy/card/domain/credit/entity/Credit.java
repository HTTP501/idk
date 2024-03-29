package com.ssafy.card.domain.credit.entity;

import com.ssafy.card.domain.bill.entity.Bill;
import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.member.entity.Member;
import com.ssafy.card.domain.organization.entity.Organization;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "CREDIT")
public class Credit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "credit_id")
    private Long creditId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_code")
    private Organization organization;

    @Column(length = 16, name = "card_number")
    private String cardNumber;

    @Column(length = 20, name = "account_num")
    private String accountNum;

    @Column(length = 20, name = "payer_number")
    private String payerNumber;

    @Column(length = 2, name = "charge_day")
    private String chargeDay;

    @Column(name = "charge_month")
    private String chargeMonth;

    @Column(name = "pay_due_date")
    private LocalDate payDueDate;

    @OneToMany(mappedBy = "credit", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bill> arrayBill;

}
