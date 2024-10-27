package com.nienluan.webshop.dto;

import com.nienluan.webshop.dto.response.RevenueSummaryResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AnalyticsDTO {
    Long allProducts;
    Long productsInMonth;
    List<RevenueSummaryResponse> totalRevenues;
    RevenueSummaryResponse totalRevenueInToday;
}
