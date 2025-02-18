package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.DistrictRequest;
import com.nienluan.webshop.dto.response.DistrictResponse;
import com.nienluan.webshop.entity.District;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DistrictMapper {
    District toDistrict(DistrictRequest request);
    DistrictResponse toDistrictResponse(District district);
}
