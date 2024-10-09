package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.CartDetailRequest;
import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.CartDetailResponse;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.CartDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartDetailMapper {

    CartDetail toCartDetail(CartDetailRequest request);

    CartDetailResponse toCartDetailResponse(CartDetail request);
}
