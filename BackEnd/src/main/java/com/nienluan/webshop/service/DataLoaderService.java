package com.nienluan.webshop.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Province;
import com.nienluan.webshop.entity.Ward;
import com.nienluan.webshop.repository.DistrictRepository;
import com.nienluan.webshop.repository.ProvinceRepository;
import com.nienluan.webshop.repository.WardRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DataLoaderService {
    ProvinceRepository provinceRepository;
    WardRepository wardRepository;
    private final DistrictRepository districtRepository;


    public void loadDataFromJson(InputStream inputStream) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode provincesNode = objectMapper.readTree(inputStream);

        for (JsonNode provinceNode : provincesNode) {
            String provinceCodeName = provinceNode.get("codename").asText();
            if (!provinceRepository.existsByCodeName(provinceCodeName)) {
                Province province = new Province();
                province.setName(provinceNode.get("name").asText());
                province.setCodeName(provinceNode.get("codename").asText());
                province.setDivisionType(provinceNode.get("division_type").asText());

                JsonNode districtsNode = provinceNode.get("districts");
                for (JsonNode districtNode : districtsNode) {
                    District district = new District();
                    district.setName(districtNode.get("name").asText());
                    district.setCodeName(districtNode.get("codename").asText());
                    district.setDivisionType(districtNode.get("division_type").asText());
                    district.setProvince(province); // Set the province for the district

                    JsonNode wardsNode = districtNode.get("wards");
                    for (JsonNode wardNode : wardsNode) {
                        Ward ward = new Ward();
                        ward.setName(wardNode.get("name").asText());
                        ward.setCodeName(wardNode.get("codename").asText());
                        ward.setDivisionType(wardNode.get("division_type").asText());
                        ward.setDistrict(district); // Set the district for the ward

                        // Thêm ward vào district
                        district.getWards().add(ward);
                    }

                    // Thêm district vào province
                    province.getDistricts().add(district);
                }

                // Lưu province cùng với tất cả districts và wards
                provinceRepository.save(province);
            }
        }
    }

}
