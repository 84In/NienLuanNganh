package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.BrandRequest;
import com.nienluan.webshop.dto.request.BrandUpdateRequest;
import com.nienluan.webshop.dto.response.BrandResponse;
import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.mapper.BrandMapper;
import com.nienluan.webshop.repository.BrandRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BrandService {

    BrandRepository brandRepository;
    BrandMapper brandMapper;

    public BrandResponse createBrand(BrandRequest request) {
        return brandMapper.toBrandResponse(brandRepository.save(brandMapper.toBrand(request)));
    }

    public Page<BrandResponse> getAllBrands(Pageable pageable) {
        return brandRepository.findAll(pageable).map(brandMapper::toBrandResponse);
    }

    public BrandResponse getBrand(String id) {
        return brandRepository.findById(id).map(brandMapper::toBrandResponse).orElse(null);
    }

    public BrandResponse updateBrand(String id, BrandUpdateRequest request) {
        Brand brand = brandRepository.findById(id).orElse(null);
        brandMapper.updateBrand(brand, request);
        brandRepository.save(brand);
        return brandMapper.toBrandResponse(brand);
    }

    public void deleteBrand(String id) {
        brandRepository.deleteById(id);
    }

}