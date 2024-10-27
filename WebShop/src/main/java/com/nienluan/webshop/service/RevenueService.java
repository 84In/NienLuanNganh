package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.RevenueSummaryRequest;
import com.nienluan.webshop.dto.response.RevenueSummaryResponse;
import com.nienluan.webshop.entity.RevenueSummary;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.RevenueMapper;
import com.nienluan.webshop.repository.OrderRepository;
import com.nienluan.webshop.repository.RevenueSummaryRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RevenueService {
    RevenueSummaryRepository revenueSummaryRepository;
    RevenueMapper revenueMapper;
    OrderService orderService;

    EntityManager entityManager;

    public void updateDailyRevenue() {
        // Tính toán startDate là ngày hôm qua
        LocalDate yesterday = LocalDate.now().minusDays(1);

        String query = "SELECT new map(DATE(o.createdAt) as summaryDate, SUM(o.totalAmount) as totalRevenue) " +
                "FROM Order o " +
                "WHERE DATE(o.createdAt) = :summaryDate " +
                "GROUP BY DATE(o.createdAt)";

        List<Map> results = entityManager.createQuery(query, Map.class)
                .setParameter("summaryDate", yesterday)
                .getResultList();

        for (Map<String, Object> result : results) {
            LocalDate summaryDate = (LocalDate) result.get("summaryDate");
            Long totalRevenue = (Long) result.get("totalRevenue");

            Optional<RevenueSummary> existingSummary = revenueSummaryRepository.findByDateRangeTypeAndSummaryDate("daily", summaryDate);
            RevenueSummary revenueSummary = existingSummary.orElse(new RevenueSummary());
            revenueSummary.setDateRangeType("daily");
            revenueSummary.setSummaryDate(summaryDate);
            revenueSummary.setTotalRevenue(totalRevenue);

            revenueSummaryRepository.save(revenueSummary);
        }
    }

    public void updateMonthlyRevenue() {
        // Tính toán startDate và endDate cho tháng trước
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusMonths(1).withDayOfMonth(1); // Ngày đầu tháng trước
        LocalDate endDate = now.minusMonths(1).withDayOfMonth(now.minusMonths(1).lengthOfMonth()); // Ngày cuối tháng trước

        String query = "SELECT new map(FUNCTION('DATE_FORMAT', o.createdAt, '%Y-%m-01') as summaryDate, SUM(o.totalAmount) as totalRevenue) " +
                "FROM Order o " +
                "WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate " +
                "GROUP BY FUNCTION('DATE_FORMAT', o.createdAt, '%Y-%m')";

        List<Map> results = entityManager.createQuery(query, Map.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        for (Map<String, Object> result : results) {
            String summaryDateStr = (String) result.get("summaryDate");
            LocalDate summaryDate = LocalDate.parse(summaryDateStr);
            Long totalRevenue = (Long) result.get("totalRevenue");

            Optional<RevenueSummary> existingSummary = revenueSummaryRepository.findByDateRangeTypeAndSummaryDate("monthly", summaryDate);
            RevenueSummary revenueSummary = existingSummary.orElse(new RevenueSummary());
            revenueSummary.setDateRangeType("monthly");
            revenueSummary.setSummaryDate(summaryDate);
            revenueSummary.setTotalRevenue(totalRevenue);

            revenueSummaryRepository.save(revenueSummary);
        }
    }

    public void updateYearlyRevenue() {
        // Tính toán startDate và endDate cho năm trước
        LocalDate now = LocalDate.now();
        LocalDate startDate = LocalDate.of(now.getYear() - 1, 1, 1); // 1/1 của năm trước
        LocalDate endDate = LocalDate.of(now.getYear() - 1, 12, 31); // 31/12 của năm trước

        String query = "SELECT new map(FUNCTION('DATE_FORMAT', o.createdAt, '%Y-01-01') as summaryDate, SUM(o.totalAmount) as totalRevenue) " +
                "FROM Order o " +
                "WHERE o.createdAt >= :startDate AND o.createdAt <= :endDate " +
                "GROUP BY FUNCTION('DATE_FORMAT', o.createdAt, '%Y')";

        List<Map> results = entityManager.createQuery(query, Map.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        for (Map<String, Object> result : results) {
            String summaryDateStr = (String) result.get("summaryDate");
            LocalDate summaryDate = LocalDate.parse(summaryDateStr);
            Long totalRevenue = (Long) result.get("totalRevenue");

            Optional<RevenueSummary> existingSummary = revenueSummaryRepository.findByDateRangeTypeAndSummaryDate("yearly", summaryDate);
            RevenueSummary revenueSummary = existingSummary.orElse(new RevenueSummary());
            revenueSummary.setDateRangeType("yearly");
            revenueSummary.setSummaryDate(summaryDate);
            revenueSummary.setTotalRevenue(totalRevenue);

            revenueSummaryRepository.save(revenueSummary);
        }
    }

    public RevenueSummaryResponse getRevenueYesterday(RevenueSummaryRequest request) {
        LocalDate yesterday = LocalDate.now().minusDays(1);

        // Lấy danh sách RevenueSummary cho ngày hôm qua
        List<RevenueSummary> summaries = (List<RevenueSummary>) revenueSummaryRepository.findByDateRangeTypeAndSummaryDate(request.getDateRangeType(), yesterday).orElseThrow(()->new AppException(ErrorCode.REVENUE_NOT_EXISTED));

        // Chuyển đổi và trả về đối tượng Response
        return revenueMapper.toRevenueSummaryResponse(summaries.getFirst());
    }

    public RevenueSummaryResponse getRevenueToday(LocalDate date) {
        return revenueMapper.toRevenueSummaryResponse(
                RevenueSummary.builder()
                        .totalRevenue(orderService.getTotalAmountInDate(date))
                        .dateRangeType("daily")
                        .summaryDate(date)
                        .build()
        );
    }

    public List<RevenueSummaryResponse> revenueOfTheMonthsITheYear(LocalDate date){
        List <RevenueSummary> revenueSummaries = revenueSummaryRepository.findAllMonthByDate(date).orElseThrow( () -> new AppException(ErrorCode.REVENUE_NOT_EXISTED) );
        if(date.equals(LocalDate.now())){
            revenueSummaries.add(RevenueSummary.builder().totalRevenue(orderService.getTotalAmountCurrentMonth()).dateRangeType("monthl").summaryDate(date).build());
        }
        return revenueSummaries.stream().map(revenueMapper::toRevenueSummaryResponse).toList();
    }
}
