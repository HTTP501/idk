package com.ssafy.idk.domain.member.entity;

import com.ssafy.idk.domain.mydata.entity.Mydata;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(name = "name")
    private String name;

    @Column(name = "birth_date", length = 344)
    private String birthDate;

    @Column(name = "pin")
    private String pin;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "connection_information")
    private String connectionInformation;

    @Column(name = "has_biometric")
    private Boolean hasBiometric = false;

    @Column(name = "transaction_push_enabled")
    private Boolean transactionPushEnabled = false;

    @Column(name = "auto_transfer_push_enabled")
    private Boolean autoTransferPushEnabled = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "mydata_agreed")
    private Boolean mydataAgreed = false;

    @Column(name = "digital_signature", length = 10000)
    private String digitalSignature;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Mydata> mydataList;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void updateAutoTransferPushEnabled() {
        this.autoTransferPushEnabled = !this.autoTransferPushEnabled;
    }

    public void updateTransactionPushEnabled() {
        this.transactionPushEnabled = !this.transactionPushEnabled;
    }

    public void updateDigitalSignature(String digitalSignature) {
        this.digitalSignature = digitalSignature;
    }

    public void updateMydataAgreed() {
        this.mydataAgreed = true;
    }
}
