package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.RevenueSummaryRequest;
import com.nienluan.webshop.dto.response.RevenueSummaryResponse;
import com.nienluan.webshop.entity.RevenueSummary;
import com.nienluan.webshop.repository.RevenueSummaryRepository;
import org.mapstruct.Mapper;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface RevenueMapper {
    RevenueSummary toRevenueSummary(RevenueSummaryRequest request);
    RevenueSummaryResponse toRevenueSummaryResponse(RevenueSummary revenueSummary);
}
