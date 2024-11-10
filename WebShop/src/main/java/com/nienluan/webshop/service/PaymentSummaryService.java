package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.PaymentSummary;
import com.nienluan.webshop.dto.response.RecentPaymentSummaryResponse;
import com.nienluan.webshop.dto.response.RevenueSummaryResponse;
import com.nienluan.webshop.entity.RecentPaymentSummary;
import com.nienluan.webshop.mapper.RecentPaymentSummaryMapper;
import com.nienluan.webshop.repository.PaymentRepository;
import com.nienluan.webshop.repository.RecentPaymentSummaryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentSummaryService {

    PaymentRepository paymentRepository;


    RecentPaymentSummaryRepository summaryRepository;
    RecentPaymentSummaryMapper recentPaymentSummaryMapper;

    public void updatePaymentSummary() {
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(7);

        // Lấy dữ liệu tổng số tiền và số lượng theo phương thức trong 7 ngày gần nhất
        List<Map<String, Object>> paymentSummaries = paymentRepository.findPaymentSummaryWithOrdersByDateRange(startDate, today);
        List<PaymentSummary> summaryList = paymentSummaries.stream()
                .map(map -> {
                    // Xử lý chuyển đổi summaryDate
                    LocalDate summaryDate;
                    Object summaryDateObject = map.get("summaryDate");
                    if (summaryDateObject instanceof java.sql.Date) {
                        summaryDate = ((java.sql.Date) summaryDateObject).toLocalDate();
                    } else if (summaryDateObject instanceof java.util.Date) {
                        summaryDate = ((java.util.Date) summaryDateObject).toInstant()
                                .atZone(ZoneId.systemDefault()).toLocalDate();
                    } else if (summaryDateObject instanceof LocalDate) {
                        summaryDate = (LocalDate) summaryDateObject; // Trường hợp đã là LocalDate
                    } else {
                        throw new IllegalArgumentException("Unsupported date type: " + summaryDateObject.getClass());
                    }

                    return new PaymentSummary(
                            (String) map.get("paymentMethodId"),
                            summaryDate,
                            (BigDecimal) map.get("totalAmount"),
                            ((Number) map.get("orderCount")).longValue()
                    );
                })
                .collect(Collectors.toList());
        // Cập nhật bảng t_recent_payment_summary
        for (PaymentSummary summary : summaryList) {
            RecentPaymentSummary recentSummary = summaryRepository.findByPaymentMethodIdAndDate(summary.getPaymentMethodId(), summary.getDate())
                    .orElse(new RecentPaymentSummary());

            recentSummary.setPaymentMethodId(summary.getPaymentMethodId());
            recentSummary.setDate(summary.getDate());
            recentSummary.setTotalAmount(summary.getTotalAmount());
            recentSummary.setTotalCount(summary.getTotalCount()); // Cập nhật trường đếm số lượng

            summaryRepository.save(recentSummary);
        }
    }
    
    public List<RecentPaymentSummaryResponse> getRecentPaymentSummary() {
        LocalDate today = LocalDate.now();
        List<RecentPaymentSummary> summaries = summaryRepository.findByDate(today);

        // Kiểm tra nếu không có dữ liệu hoặc dữ liệu đã quá 3 giờ
        if (summaries.isEmpty() || summaries.get(0).getCreatedAt().isBefore(LocalDateTime.now().minusHours(3))) {
            updatePaymentSummary();
            summaries = summaryRepository.findByDate(today);
        }

        return summaries.stream().map(recentPaymentSummaryMapper::toRecentPaymentSummaryResponse).toList();
    }
}
