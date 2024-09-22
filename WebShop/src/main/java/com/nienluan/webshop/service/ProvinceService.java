package com.nienluan.webshop.service;

import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Province;
import com.nienluan.webshop.repository.DistrictRepository;
import com.nienluan.webshop.repository.ProvinceRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProvinceService {

    ProvinceRepository provinceRepository;

    @Transactional
    public void saveOrUpdateDistrict(Province province) {
        // Kiểm tra xem thực thể có ID không
        if (province.getId() != null) {
            // Nếu có ID, sử dụng merge để cập nhật
            provinceRepository.save(province); // Hibernate sẽ tự động update
        } else {
            // Nếu không có ID, sử dụng save để insert
            provinceRepository.save(province); // Hibernate sẽ insert
        }
    }

}
