package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ProductRequest;
import com.nienluan.webshop.dto.request.ProductUpdateRequest;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.entity.Product;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.ProductMapper;
import com.nienluan.webshop.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {

    ProductRepository productRepository;

    ProductMapper productMapper;


    public ProductResponse createProduct(ProductRequest request) throws AppException {

        if(productRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }

        Product product = productMapper.toProduct(request);

        return  productMapper.toProductResponse(productRepository.save(product));

    }

    public Page<ProductResponse> getAllProducts(Pageable pageable){
        return productRepository.findAll(pageable).map(productMapper::toProductResponse);
    }

    public ProductResponse getProduct(String id){
        return productRepository.findById(id).map(productMapper::toProductResponse).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
    }

    public ProductResponse updateProduct(ProductUpdateRequest request, String id) throws AppException {

        var product = productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        productMapper.updateProduct(product,request);

        return  productMapper.toProductResponse(productRepository.save(product));
    }

    public void deleteProduct(String id){
        productRepository.deleteById(id);
    }

}
