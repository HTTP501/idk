package com.ssafy.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "permission")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name = "permission_name")
    private PermissionName name;

    @OneToMany(mappedBy = "permission", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<OrganizationPermission> organizationPermissionList;
}
