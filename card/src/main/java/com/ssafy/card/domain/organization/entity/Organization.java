package com.ssafy.card.domain.organization.entity;

import com.ssafy.card.domain.company.entity.Company;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "ORGANIZATION")
public class Organization {

    @Id
    @Column(name = "org_code")
    private String orgCode;

    @Column(length = 10, name = "org_name")
    private String orgName;

    @Column(length = 4, name = "org_type")
    private String orgType;

    @Column(name = "access_token")
    private String accessToken;

    @OneToOne(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Company company;

}
