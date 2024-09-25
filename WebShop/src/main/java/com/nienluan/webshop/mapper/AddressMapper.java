package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.AddressRequest;
import com.nienluan.webshop.dto.request.AddressUpdateRequest;
import com.nienluan.webshop.dto.response.AddressResponse;
import com.nienluan.webshop.entity.Address;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toAddress(AddressRequest request);
    AddressResponse toAddressResponse(Address address);

    void updateAddress(@MappingTarget Address address, AddressUpdateRequest request);
}
