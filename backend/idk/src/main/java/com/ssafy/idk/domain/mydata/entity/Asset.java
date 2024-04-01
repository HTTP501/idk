package com.ssafy.idk.domain.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="asset")
public class  Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "designated_org_name")
    private String designatedOrgName;

    @Column(name = "designated_org_code")
    private String designatedOrgCode;

    @Column(name = "scheduled_amount")
    private Long scheduledAmount;

    @Column(name = "scheduled_date")
    private Integer scheduledDate;

    @Column(name = "is_linked")
    private Boolean isLinked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mydata_id")
    private Mydata mydata;

    public void updateScheduledAmount(Long scheduledAmount) {
        this.scheduledAmount = scheduledAmount;
    }

    public void updateScheduledDate(Integer scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public void updateIsLinked(Boolean isLinked) {
        this.isLinked = isLinked;
    }
}
