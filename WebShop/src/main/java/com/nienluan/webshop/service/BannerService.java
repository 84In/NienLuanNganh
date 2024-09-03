package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.BannerRequest;
import com.nienluan.webshop.dto.request.BannerUpdateRequest;
import com.nienluan.webshop.dto.response.BannerResponse;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.BannerMapper;
import com.nienluan.webshop.repository.BannerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BannerService {
    BannerRepository bannerRepository;
    BannerMapper bannerMapper;

    public BannerResponse createBanner(BannerRequest request) {
        if (bannerRepository.existsByTitle(request.getTitle())){
            throw new AppException(ErrorCode.BANNER_EXISTED);
        }
        return bannerMapper.toBannerResponse(bannerRepository.save(bannerMapper.toBanner(request)));
    }

    public Page<BannerResponse> getAllBanners(Pageable pageable) {
        return bannerRepository.findAll(pageable).map(bannerMapper::toBannerResponse);
    }

    public BannerResponse getBanner(String id) {
        return bannerRepository.findById(id).map(bannerMapper::toBannerResponse).orElseThrow(()-> new AppException(ErrorCode.BANNER_NOT_EXISTED));
    }

    public BannerResponse updateBanner(String id, BannerUpdateRequest request) {
        var banner = bannerRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.BANNER_NOT_EXISTED));

        bannerMapper.updateBanner(banner,request);

        return bannerMapper.toBannerResponse(bannerRepository.save(banner));
    }

    public void deleteBanner(String id) {
        bannerRepository.deleteById(id);
    }
}
