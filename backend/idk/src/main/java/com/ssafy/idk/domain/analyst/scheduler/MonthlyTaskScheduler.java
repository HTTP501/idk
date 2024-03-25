package com.ssafy.idk.domain.Analyst.scheduler;

import com.ssafy.idk.domain.Analyst.service.AnalystService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MonthlyTaskScheduler {

    private final AnalystService analystService;

    @Scheduled(cron = "0 0 0 1 * *") // 매월 1일 자정에 실행
    public void aggregateMonthlyTask() {
        analystService.saveDataForNewMonth();
    }
}
