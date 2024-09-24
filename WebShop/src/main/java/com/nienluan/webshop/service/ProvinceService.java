package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.response.ProvinceResponse;
import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Province;
import com.nienluan.webshop.mapper.ProvinceMapper;
import com.nienluan.webshop.repository.DistrictRepository;
import com.nienluan.webshop.repository.ProvinceRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProvinceService {

    ProvinceRepository provinceRepository;
    ProvinceMapper provinceMapper;

    public List<ProvinceResponse> getProvinces() {
        return provinceRepository.findAll().stream().map(provinceMapper::toProvinceResponse).toList();
    }

}
