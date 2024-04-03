package com.ssafy.idk.global.util;

import com.ssafy.idk.domain.autotransfer.service.AutoTransferService;
import com.ssafy.idk.domain.pocket.service.PocketService;
import com.ssafy.idk.domain.salary.service.SalaryService;
//import com.ssafy.idk.global.stream.dto.SseDateDto;
//import com.ssafy.idk.global.stream.service.SseEmitterService;
import com.ssafy.idk.domain.targetsaving.service.TargetSavingService;
import com.ssafy.idk.global.stream.controller.SSEController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
@Slf4j
public class TimeUtil {

    private LocalDate systemDate = LocalDate.now();
    private Integer systemYear = 2024;
    private Integer systemMonth = 4;
    private Integer systemDay = 1;
    private final SalaryService salaryService;
    private final PocketService pocketService;
    private final AutoTransferService autoTransferService;
    private final SSEController sseController;
    private final TargetSavingService targetSavingService;

    public LocalDate getSystemDate() {
        return systemDate;
    }

    @Scheduled(fixedRate = 5000)
    public void oneDayCycle() {

        // 업데이트해야 하는 멤버 목록
        HashSet<Long> members = new HashSet<>();

        // 날짜 변경
        updateDate();

        // 날짜 스트리밍
        sseController.sendUpdatedDate(systemDate);

        // 자동이체
        members.addAll(autoTransferService.routineAutoTransfer(systemDay));

        // 신용카드 청구서 확인


        // 월급 입금
        members.addAll(salaryService.salaryDeposit(systemDay));

        // 목표 저축 상태 변경
        targetSavingService.autoWithdrawTargetSaving(systemDay);

        // 돈 포켓 상태 변경
        members.addAll(pocketService.updatePocketStatementBeforeOneDayFromSalaryDay(systemDate.minusDays(1).getDayOfMonth()));

        sseController.sendToMemberUpdated(members);

//        if (systemDay == 1) {
//            // 통계 함수 사용
//        }
    }

    public void updateDate() {
        updateDay();
        systemDate = LocalDate.of(systemYear, systemMonth, systemDay);
        System.out.println(systemDate);
    }

    private void updateDay() {
        int day = 0;
        if (systemMonth == 1 || systemMonth == 3 || systemMonth == 5 || systemMonth == 7 || systemMonth == 8 || systemMonth == 10 || systemMonth == 12) {
            day = (this.systemDay + 1) % 32;
        } else if (systemMonth == 2) {
            day = (this.systemDay + 1) % 29;
        } else {
            day = (this.systemDay + 1) % 31;
        }
        if (day == 0) {
            day++;
            updateMonth();
        }
        this.systemDay = day;
    }

    private void updateMonth() {
        int month = (this.systemMonth + 1) % 13;
        if (month == 0) {
            month++;
            updateYear();
        }
        this.systemMonth = month;
    }

    private void updateYear() {
        this.systemYear++;
    }


}
