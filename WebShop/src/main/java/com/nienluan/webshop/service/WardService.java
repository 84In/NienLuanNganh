package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.response.WardResponse;
import com.nienluan.webshop.mapper.WardMapper;
import com.nienluan.webshop.repository.WardRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WardService {

    WardRepository wardRepository;
    WardMapper wardMapper;

    public List<WardResponse> getAllWards() {
        return wardRepository.findAll().stream().map(wardMapper::toWardResponse).toList();
    }

    public List<WardResponse> getWardsByDistrict(Integer district) {
        return wardRepository.findAllByDistrict(district).stream().map(wardMapper::toWardResponse).toList();
    }
}
