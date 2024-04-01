package com.ssafy.idk.global.util;

import com.ssafy.idk.domain.salary.service.SalaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class TimeUtil {

    private LocalDate systemDate = LocalDate.now();
    private Integer systemYear = 2024;
    private Integer systemMonth = 4;
    private Integer systemDay = 1;
    private final SalaryService salaryService;

//    @Scheduled(fixedRate = 5000)
//    public void oneDayCycle() {
//        updateDate();
//        salaryService.salaryDeposit(systemDay);
//    }

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
