package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.PromotionRequest;
import com.nienluan.webshop.dto.request.PromotionUpdateRequest;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.dto.response.PromotionResponse;
import com.nienluan.webshop.service.PromotionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/promotions")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PromotionController {

   PromotionService promotionService;

   @GetMapping
    public ApiResponse<Page<PromotionResponse>> getPromotions(Pageable pageable) {
       return ApiResponse.<Page<PromotionResponse>>builder()
               .result(promotionService.getPromotions(pageable))
               .build();
   }

   @GetMapping("/{promotionId}")
   public ApiResponse<PromotionResponse> getPromotion(@PathVariable String promotionId) {
       return ApiResponse.<PromotionResponse>builder()
               .result(promotionService.getPromotion(promotionId))
               .build();
   }

   @GetMapping("/check/{promotionCode}")
   public ApiResponse<Boolean> checkPromotion(@PathVariable String promotionCode) {
       return ApiResponse.<Boolean>builder()
               .result(promotionService.checkCodePromotion(promotionCode))
               .build();
   }

   @PostMapping
    public ApiResponse<PromotionResponse> createPromotion(@RequestBody PromotionRequest request) {
       return ApiResponse.<PromotionResponse>builder()
               .message("Created Promotion!")
               .result(promotionService.createPromotion(request))
               .build();
   }

   @PutMapping("/{promotionId}")
    public ApiResponse<PromotionResponse> updatePromotion(@PathVariable String promotionId, @RequestBody PromotionUpdateRequest request) {
       return ApiResponse.<PromotionResponse>builder()
               .result(promotionService.updatePromotion(promotionId,request))
               .build();
   }

   @DeleteMapping("/{promotionId}")
    public ApiResponse<Void> deletePromotion(@PathVariable String promotionId) {
       return ApiResponse.<Void>builder()
               .message("Deleted Promotion!")
               .build();
   }

}
