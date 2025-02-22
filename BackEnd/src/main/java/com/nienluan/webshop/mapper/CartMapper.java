package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.entity.Cart;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartMapper {

    Cart toCart(CartRequest request);

    CartResponse toCartResponse(Cart request);
}
