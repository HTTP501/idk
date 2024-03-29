package com.ssafy.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "orgniazation")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "org_code")
    private String orgCode;

    @Column(name = "org_type")
    private OrganizationType orgType;

    @Column(name = "client_id")
    private String clientId;

    @Column(name = "client_secret")
    private String clientSecret;

    @OneToMany(mappedBy = "organization", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<OrganizationPermission> organizationPermissionList;

}
