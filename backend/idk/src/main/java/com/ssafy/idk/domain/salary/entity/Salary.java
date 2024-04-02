package com.ssafy.idk.domain.salary.entity;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.checkerframework.checker.units.qual.C;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "SALARY")
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "salary_id")
    private Long salaryId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id") @NotNull
    private Account account;

    @Column(name = "salary_day")
    private Integer salaryDay;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "amount")
    private Long amount;

    public void setSalaryDay(Integer salaryDay) {
        this.salaryDay = salaryDay;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
