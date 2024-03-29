package com.ssafy.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.PriorityQueue;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="org_permission")
public class OrganizationPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id")
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "permission_id")
    private Permission permission;

    public void setOrganization(Organization organization) {
        this.organization = organization;
        if (organization != null) {
            organization.getOrganizationPermissionList().add(this);
        }
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
        if (permission != null) {
            permission.getOrganizationPermissionList().add(this);
        }
    }


}
