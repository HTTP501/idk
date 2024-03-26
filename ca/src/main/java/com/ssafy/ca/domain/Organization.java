package com.ssafy.ca.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "ca_organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long org_id;

    @Column(name = "org_code")
    private String orgCode;

    @Column(name = "org_type")
    private OrganizationType orgType;

    @Column(name = "token")
    private String token;

    @OneToMany(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<OrganizationMember> organizationMembers;

}
