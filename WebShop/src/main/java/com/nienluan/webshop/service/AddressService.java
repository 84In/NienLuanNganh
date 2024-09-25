package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.AddressRequest;
import com.nienluan.webshop.dto.request.AddressUpdateRequest;
import com.nienluan.webshop.dto.response.AddressResponse;
import com.nienluan.webshop.entity.Address;
import com.nienluan.webshop.mapper.AddressMapper;
import com.nienluan.webshop.repository.AddressRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressService {

    AddressRepository addressRepository;
    AddressMapper addressMapper;

    public AddressResponse createAddress(AddressRequest request) {
        return addressMapper.toAddressResponse(addressRepository.save(addressMapper.toAddress(request)));
    }

    public Page<AddressResponse> getAllAddresses(Pageable pageable) {
        return addressRepository.findAll(pageable).map(addressMapper::toAddressResponse);
    }

    public AddressResponse getAddressById(String id) {
        return addressRepository.findById(id).map(addressMapper::toAddressResponse).orElse(null);
    }

    public AddressResponse updateAddress(String id, AddressUpdateRequest request) {
        Address address = addressRepository.findById(id).orElse(null);
        addressMapper.updateAddress(address, request);
        return addressMapper.toAddressResponse(address);
    }

    public void deleteAddress(String id) {
        addressRepository.deleteById(id);
    }

}
