package com.nienluan.webshop.service;

import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.repository.DistrictRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DistrictService {

    DistrictRepository districtRepository;

    @Transactional
    public void saveOrUpdateDistrict(District district) {
        // Kiểm tra xem thực thể có ID không
        if (district.getId() != null) {
            // Nếu có ID, sử dụng merge để cập nhật
            districtRepository.save(district); // Hibernate sẽ tự động update
        } else {
            // Nếu không có ID, sử dụng save để insert
            districtRepository.save(district); // Hibernate sẽ insert
        }
    }

}
