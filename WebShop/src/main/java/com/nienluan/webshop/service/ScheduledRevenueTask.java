package com.nienluan.webshop.service;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScheduledRevenueTask {

    RevenueService revenueService;

    @Scheduled(cron = "0 0 0 * * *") // Mỗi ngày lúc nửa đêm
    public void updateDailyRevenue() {
        revenueService.updateDailyRevenue();
    }

    @Scheduled(cron = "0 0 0 1 * *") // Ngày 1 mỗi tháng
    public void updateMonthlyRevenue() {
        revenueService.updateMonthlyRevenue();
    }

    @Scheduled(cron = "0 0 0 1 1 *") // Ngày 1 tháng 1 mỗi năm
    public void updateYearlyRevenue() {
        revenueService.updateYearlyRevenue();
    }

}
