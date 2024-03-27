package com.ssafy.idk.domain.pocket.service;

import com.ssafy.idk.domain.account.entity.Account;
import com.ssafy.idk.domain.pocket.entity.Pocket;
import com.ssafy.idk.domain.targetsaving.entity.TargetSaving;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PocketService {

    public Pocket createByTargetSaving(TargetSaving targetSaving, Account account) {

        Pocket pocket = Pocket.builder()
                .account(account)
                .targetSaving(targetSaving)
                .name(targetSaving.getName() + "의 돈포켓")
                .target(targetSaving.getMonthlyAmount())
                .isActivated(false)
                .isDeposited(false)
                .isPaid(false)
                .orderNumber(account.getArrayPocketOrders().size())
                .build();

        return pocket;
    }
}
