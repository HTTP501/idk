package com.ssafy.idk.domain.pocket.entity;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.autotransfer.entity.AutoTransfer;
import com.ssafy.idk.domain.autodebit.entity.AutoDebit;
import com.ssafy.idk.domain.member.entity.Member;
import com.ssafy.idk.domain.mydata.entity.Mydata;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name = "POCKET")
public class Pocket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pocket_id") @NotNull
    private Long pocketId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "pocket_type") @NotNull
    private PocketType pocketType;

    @OneToOne
    @JoinColumn(name = "target_saving_id")
    private TargetSaving targetSaving;

    @OneToOne
    @JoinColumn(name = "auto_transfer_id")
    private AutoTransfer autoTransfer;

    @OneToOne
    @JoinColumn(name = "mydata_id")
    private Mydata mydata;

    @Column(name = "name") @NotNull
    private String name;

    @Column(name = "balance") @NotNull
    private Long balance;

    @Column(name = "expected_date") @NotNull
    private Integer expectedDate;

    @Column(name = "target") @NotNull
    private Long target;

    @Column(name = "is_activated") @NotNull
    private boolean isActivated;

    @Column(name = "is_deposited") @NotNull
    private boolean isDeposited;

    @Column(name = "is_paid") @NotNull
    private boolean isPaid;

    @Column(name = "order_number") @NotNull
    private Integer orderNumber;

    @OneToMany(mappedBy = "pocket", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<PocketTransaction> arrayPocketTranscation;

    public void setName(String name) {
        this.name = name;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public void setDeposited(boolean deposited) {
        isDeposited = deposited;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public void setActivated(boolean activated) {
        isActivated = activated;
    }

    public void deposit() {
        this.balance = this.target;
        this.isDeposited = true;
    }

    public void withdraw() {
        this.balance = 0L;
        this.isDeposited = false;
    }

    @PrePersist
    public void prePresist() {
        this.balance = 0L;
        this.isActivated = true;
        this.isDeposited = false;
        this.isPaid = false;
    }
}