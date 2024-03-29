package com.ssafy.card.domain.company.entity;

import com.ssafy.card.domain.credit.entity.Credit;
import com.ssafy.card.domain.organization.entity.Organization;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "COMPANY")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id") @NotNull
    private Long companyId;

    @Column(length = 10, name = "name") @NotNull
    private String name;

    @JoinColumn(name = "org_code") @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    private Organization organization;

    @Column(length = 20, name = "client_id")
    private String clientId;

    @Column(length = 20, name = "client_secret")
    private String clientSecret;

    @OneToMany(mappedBy = "company", fetch=FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Credit> arrayCredit;

}
