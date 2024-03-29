package com.ssafy.card.domain.organization.entity;

import com.ssafy.card.domain.credit.entity.Credit;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "ORGANIZATION")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_code")
    private Long orgCode;

    @Column(length = 10, name = "org_name")
    private String orgName;

    @Column(name = "org_type")
    private OrgType orgType;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @OneToMany(mappedBy = "orgCode", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Credit> arrayCredit;

}
