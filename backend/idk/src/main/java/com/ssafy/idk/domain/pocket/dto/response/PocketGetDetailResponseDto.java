package com.ssafy.idk.domain.pocket.dto.response;

import com.ssafy.idk.domain.pocket.entity.PocketType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class PocketGetDetailResponseDto {

    private Long pocketId;
    private PocketType pocketType;
    private Long targetSavingId;
    private Long autoTransferId;
    private Long autoDebitId;
    private String name;
    private Long balance;
    private Long target;
    private LocalDate expectedDate;
    private boolean isActivated;
    private boolean isDeposited;
    private boolean isPaid;
    private List<PocketTransactionResponseDto> arrayPocketTransaction;

    public static PocketGetDetailResponseDto of(
            Long pocketId,
            PocketType pocketType,
            Long targetSavingId,
            Long autoTransferId,
            Long autoDebitId,
            String name,
            Long balance,
            Long target,
            LocalDate expectedDate,
            boolean isActivated,
            boolean isDeposited,
            boolean isPaid,
            List<PocketTransactionResponseDto> arrayPocketTransaction
    ) {
        return PocketGetDetailResponseDto.builder()
                .pocketId(pocketId)
                .pocketType(pocketType)
                .targetSavingId(targetSavingId)
                .autoTransferId(autoTransferId)
                .autoDebitId(autoDebitId)
                .name(name)
                .balance(balance)
                .target(target)
                .expectedDate(expectedDate)
                .isActivated(isActivated)
                .isDeposited(isDeposited)
                .isPaid(isPaid)
                .arrayPocketTransaction(arrayPocketTransaction)
                .build();
    }

    public static PocketGetDetailResponseDto of(
            Long pocketId,
            PocketType pocketType,
            Long targetSavingId,
            Long autoTransferId,
            Long autoDebitId,
            String name,
            Long balance,
            Long target,
            LocalDate expectedDate,
            boolean isActivated,
            boolean isDeposited,
            boolean isPaid
    ) {
        return PocketGetDetailResponseDto.builder()
                .pocketId(pocketId)
                .pocketType(pocketType)
                .targetSavingId(targetSavingId)
                .autoTransferId(autoTransferId)
                .autoDebitId(autoDebitId)
                .name(name)
                .balance(balance)
                .target(target)
                .expectedDate(expectedDate)
                .isActivated(isActivated)
                .isDeposited(isDeposited)
                .isPaid(isPaid)
                .build();
    }
}
