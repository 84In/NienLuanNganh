package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.ProductCsvDTO;
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
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
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
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));

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

    public Page<ProductResponse> getProductsByCategory(Pageable pageable, String categoryCodeName) {
        if(!categoryRepository.existsByCodeName(categoryCodeName)){
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }
        Category category = categoryRepository.findByCodeName(categoryCodeName);
        log.info(category.getName());
        Page<Product> products = productRepository.findByCategory(pageable, category);
        log.info(products.getTotalElements() + " products");
        return products.map(productMapper::toProductResponse);
    }

    public ProductResponse updateProduct(ProductUpdateRequest request, String id) throws AppException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        // Cập nhật Category và Brand nếu cần
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
            product.setCategory(category);
        }

        if (request.getBrandId() != null) {
            Brand brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));
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

    @Transactional
    public void saveProductsFromCsv(List<ProductCsvDTO> products, String categoryId) {
        // Kiểm tra danh mục tồn tại
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        Set<String> existingProductNames = new HashSet<>();

        for (ProductCsvDTO product : products) {

            if (!brandRepository.existsByName(product.getBrandName())) {
                brandRepository.save( Brand.builder().name(product.getBrandName()).build());
            }
        }
        for (ProductCsvDTO product : products) {
            if (existingProductNames.contains(product.getName()) || productRepository.existsByName(product.getName())) {
                continue; // Nếu sản phẩm đã tồn tại, bỏ qua
            }
            Brand brand = brandRepository.findByName(product.getBrandName()).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));
            Product pr = Product.builder()
                    .name(product.getName())
                    .description(product.getDescription())
                    .price(product.getPrice())
                    .stockQuantity(product.getStock_quantity())
                    .images(product.getImages())
                    .category(category)
                    .brand(brand) // Sử dụng thương hiệu đã kiểm tra
                    .build();
            productRepository.save(pr);
            existingProductNames.add(product.getName());
        }

    }



}
