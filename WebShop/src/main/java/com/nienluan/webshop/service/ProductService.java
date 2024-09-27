package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ProductRequest;
import com.nienluan.webshop.dto.request.ProductUpdateRequest;
import com.nienluan.webshop.dto.response.ProductResponse;
import com.nienluan.webshop.entity.Brand;
import com.nienluan.webshop.entity.Category;
import com.nienluan.webshop.entity.Product;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.ProductMapper;
import com.nienluan.webshop.repository.BrandRepository;
import com.nienluan.webshop.repository.CategoryRepository;
import com.nienluan.webshop.repository.ProductRepository;
import com.nienluan.webshop.repository.PromotionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;
    PromotionRepository promotionRepository;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;

    public ProductResponse createProduct(ProductRequest request) throws AppException {
        if (productRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }

        // Tìm Category và Brand theo ID từ request
        Category category = categoryRepository.findById(request.getCategory_id())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        Brand brand = brandRepository.findById(request.getBrand_id())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        Product product = productMapper.toProduct(request);
        product.setCategory(category);
        product.setBrand(brand);

        return productMapper.toProductResponse(productRepository.save(product));
    }

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toProductResponse);
    }

    public ProductResponse getProduct(String id) {
        return productRepository.findById(id)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
    }

    public ProductResponse updateProduct(ProductUpdateRequest request, String id) throws AppException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        // Cập nhật Category và Brand nếu cần
        if (request.getCategory_id() != null) {
            Category category = categoryRepository.findById(request.getCategory_id())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            product.setCategory(category);
        }

        if (request.getBrand_id() != null) {
            Brand brand = brandRepository.findById(request.getBrand_id())
                    .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
            product.setBrand(brand);
        }

        // Ánh xạ các trường khác từ request
        productMapper.updateProduct(product, request);

        // Cập nhật promotions
        var promotions = promotionRepository.findAllById(request.getPromotions());
        product.setPromotions(new HashSet<>(promotions));

        return productMapper.toProductResponse(productRepository.save(product));
    }

    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new AppException(ErrorCode.PRODUCT_NOT_EXISTED);
        }
        productRepository.deleteById(id);
    }
}
