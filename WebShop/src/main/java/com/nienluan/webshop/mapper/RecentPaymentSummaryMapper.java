package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.response.RecentPaymentSummaryResponse;
import com.nienluan.webshop.entity.RecentPaymentSummary;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecentPaymentSummaryMapper {
    RecentPaymentSummaryResponse toRecentPaymentSummaryResponse(RecentPaymentSummary recentPaymentSummary);
}
