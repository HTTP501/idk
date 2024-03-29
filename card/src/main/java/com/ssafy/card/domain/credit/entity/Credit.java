package com.ssafy.card.domain.credit.entity;

import com.ssafy.card.domain.bill.entity.Bill;
import com.ssafy.card.domain.company.entity.Company;
import com.ssafy.card.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
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
    @Column(name = "credit_id") @NotNull
    private Long creditId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id") @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id") @NotNull
    private Company company;

    @Column(length = 16, name = "card_number") @NotNull
    private String cardNumber;

    @Column(length = 20, name = "account_num") @NotNull
    private String accountNum;

    @Column(length = 10, name = "account_org_code") @NotNull
    private String accountOrgCode;

    @Column(length = 20, name = "payer_number") @NotNull
    private String payerNumber;

    @Column(length = 2, name = "charge_day") @NotNull
    private String chargeDay;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    @OneToMany(mappedBy = "credit", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Bill> arrayBill;

    @PrePersist
    public void prePresist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

}
