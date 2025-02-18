package com.nienluan.webshop.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RevenueSummaryRequest {
    String dateRangeType;
    LocalDate summaryDate;
}

