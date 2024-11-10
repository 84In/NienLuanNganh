package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.PromotionRequest;
import com.nienluan.webshop.dto.request.PromotionUpdateRequest;
import com.nienluan.webshop.dto.response.PromotionResponse;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.PromotionMapper;
import com.nienluan.webshop.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PromotionService {

    PromotionRepository promotionRepository;
    PromotionMapper promotionMapper;

    public PromotionResponse createPromotion(PromotionRequest request) {
        if (promotionRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.PROMOTION_EXISTED);
        }
        return promotionMapper.toPromotionResponse(promotionRepository.save(promotionMapper.toPromotion(request)));
    }

    public Page<PromotionResponse> getPromotions(Pageable pageable) {
        return promotionRepository.findAll(pageable).map(promotionMapper::toPromotionResponse);
    }

    public PromotionResponse getPromotion(String id) {
        return promotionRepository.findById(id).map(promotionMapper::toPromotionResponse).orElseThrow(() -> new AppException(ErrorCode.PROMOTION_NOT_EXISTED));
    }

    public PromotionResponse updatePromotion(String id, PromotionUpdateRequest request) {
        var promotion = promotionRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROMOTION_NOT_EXISTED));
        promotionMapper.updatePromotion(promotion, request);
        return promotionMapper.toPromotionResponse(promotionRepository.save(promotion));
    }

    public boolean checkCodePromotion(String code) {
        return promotionRepository.existsByCode(code);
    }

    public void deletePromotion(String id) {
        promotionRepository.deleteById(id);
    }

    public List<PromotionResponse> searchPromotion(String name) {
        return promotionRepository.findByNameContaining(name).stream().map(promotionMapper::toPromotionResponse).toList();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanUpExpiredPromotions() {
        log.info("Starting cleanup of expired promotions at 00:00 AM...");
        LocalDateTime now = LocalDateTime.now();
        var expiredPromotions = promotionRepository.findAll().stream()
                .filter(promotion -> promotion.getEndDate().isBefore(now))
                .collect(Collectors.toList());
        promotionRepository.deleteAll(expiredPromotions);
        log.info("Completed cleanup of expired promotions.");
    }
}
