package com.nienluan.webshop.controller;

import com.nienluan.webshop.dto.request.AddressRequest;
import com.nienluan.webshop.dto.request.AddressUpdateRequest;
import com.nienluan.webshop.dto.response.AddressResponse;
import com.nienluan.webshop.dto.response.ApiResponse;
import com.nienluan.webshop.service.AddressService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/addresses")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AddressController {

    AddressService addressService;

    @GetMapping
    public ApiResponse<Page<AddressResponse>> getAllAddresses(Pageable pageable) {
        return ApiResponse.<Page<AddressResponse>>builder().
                result(addressService.getAllAddresses(pageable)).
                build();
    }

    @GetMapping("/{addressId}")
    public ApiResponse<AddressResponse> getAddressById(@PathVariable String addressId) {
        return  ApiResponse.<AddressResponse>builder()
                .result(addressService.getAddressById(addressId))
                .build();
    }

    @PostMapping
    public ApiResponse<AddressResponse> addAddress(@RequestBody AddressRequest request) {
        return ApiResponse.<AddressResponse>builder()
                .result(addressService.createAddress(request))
                .build();
    }

    @PutMapping("/{addressId}")
    public ApiResponse<AddressResponse> updateAddress(@PathVariable String addressId, @RequestBody AddressUpdateRequest request) {
        return ApiResponse.<AddressResponse>builder()
                .result(addressService.updateAddress(addressId, request))
                .build();
    }

    @DeleteMapping("/{addressId}")
    public ApiResponse<Void> deleteAddress(@PathVariable String addressId) {
        return ApiResponse.<Void>builder()
                .message("Delete Successful")
                .build();
    }

}
