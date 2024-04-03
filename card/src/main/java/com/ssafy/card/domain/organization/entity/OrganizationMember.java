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
public class OrganizationMember {

    @Id
    @Column(name = "org_code", unique = true)
    private String orgCode;

    @Column(length = 10, name = "org_name")
    private String orgName;

    @Enumerated(EnumType.STRING)
    @Column(length = 4, name = "org_type", columnDefinition = "TEXT")
    private OrgType orgType;

    @OneToOne(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Company company;

}
