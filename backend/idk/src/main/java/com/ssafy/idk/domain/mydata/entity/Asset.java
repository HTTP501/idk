package com.ssafy.idk.domain.mydata.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Table(name="asset")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "payment_receiver")
    private String paymentReceiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mydata_id")
    private Mydata mydata;
}
