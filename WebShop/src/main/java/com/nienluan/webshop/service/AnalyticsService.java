package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.AnalyticsDTO;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AnalyticsService {

    RevenueService revenueService;
    ProductService productService;

    public AnalyticsDTO getAnalytics() {
        AnalyticsDTO analyticsDTO = new AnalyticsDTO();
        analyticsDTO.setAllProducts(productService.countAllProducts());
        analyticsDTO.setProductsInMonth(productService.countProductInCurrentMonth());
        analyticsDTO.setTotalRevenues(revenueService.revenueOfTheMonthsITheYear(LocalDate.now()));
        analyticsDTO.setTotalRevenueInToday(revenueService.getRevenueToday(LocalDate.now()));
        return analyticsDTO;
    }
}
