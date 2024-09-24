package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.ProvinceRequest;
import com.nienluan.webshop.dto.response.ProvinceResponse;
import com.nienluan.webshop.entity.Province;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProvinceMapper {

    Province toProvince(ProvinceRequest request);

    ProvinceResponse toProvinceResponse(Province province);
}
