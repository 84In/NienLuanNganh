package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.response.DistrictResponse;
import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.mapper.DistrictMapper;
import com.nienluan.webshop.repository.DistrictRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DistrictService {

    DistrictRepository districtRepository;
    DistrictMapper districtMapper;

    public List<DistrictResponse> getAllDistricts() {
        return districtRepository.findAll().stream().map(districtMapper::toDistrictResponse).toList();
    }

    public List<DistrictResponse> getDistrictsByProvince(Integer province) {
        return districtRepository.findAllByProvince(province).stream().map(districtMapper::toDistrictResponse).toList();
    }

}
