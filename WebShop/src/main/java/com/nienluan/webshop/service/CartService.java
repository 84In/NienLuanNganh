package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.CartDetailResponse;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.dto.response.SingleCartResponse;
import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.CartDetail;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.CartDetailMapper;
import com.nienluan.webshop.mapper.CartMapper;
import com.nienluan.webshop.mapper.ProductMapper;
import com.nienluan.webshop.repository.CartRepository;
import com.nienluan.webshop.repository.ProductRepository;
import com.nienluan.webshop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
public class CartService {

    private static final Logger log = LoggerFactory.getLogger(CartService.class);
    CartRepository cartRepository;
    CartMapper cartMapper;
    UserRepository userRepository;
    ProductRepository productRepository;
    CartDetailMapper cartDetailMapper;
    ProductMapper productMapper;

//    Giữ lại
//    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
//    public CartResponse createCart(CartRequest request) {
//        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
//        var cart = cartRepository.existsByUser(user)
//                ? cartRepository.findByUser(user)
//                : Cart.builder().user(user).build();
//        var product = productRepository.findById(request.getCartDetail().getProductId())
//                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
//
//        if (cart.getCartDetails() == null) {
//            cart.setCartDetails(new HashSet<>());
//        }
//        var existingCartDetail = cart.getCartDetails().stream()
//                .filter(detail -> detail.getProduct().getId().equals(product.getId()))
//                .findFirst();
//
//        if (existingCartDetail.isPresent()) {
//            CartDetail cartDetail = existingCartDetail.get();
//            cartDetail.setQuantity(cartDetail.getQuantity().add(request.getCartDetail().getQuantity()));
//        } else {
//            CartDetail cartDetail = CartDetail.builder()
//                    .cart(cart)
//                    .product(product)
//                    .quantity(request.getCartDetail().getQuantity())
//                    .build();
//            cart.getCartDetails().add(cartDetail);
//        }
//
//        cart = cartRepository.save(cart);
//        Set<CartDetailResponse> cartDetailResponses = fromCartToCartDetailResponse(cart);
//
//        log.warn("Cart: {} {}", cart.getUser().getId(), cart.getCartDetails().stream().map(cartDetailMapper::toCartDetailResponse).collect(Collectors.toList()));
//        log.warn("Product: {}", product.getName());
//        log.warn("CartDetail: {}", cartDetailResponses);
//
//
//        return CartResponse.builder()
//                .id(cart.getId())
//                .cartDetails(cartDetailResponses)
//                .build();
//    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public SingleCartResponse createCart(CartRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user)
                ? cartRepository.findByUser(user)
                : Cart.builder().user(user).cartDetails(new HashSet<>()).build();
        var product = productRepository.findById(request.getCartDetail().getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        if (cart.getCartDetails() == null) {
            cart.setCartDetails(new HashSet<CartDetail>());
        }

        boolean productExists = false;
        CartDetail cartDetail = new CartDetail();
        for (CartDetail item : cart.getCartDetails()) {
            if (item.getProduct().getId().equals(product.getId())) {
                // Sản phẩm đã tồn tại, tăng số lượng
                item.setQuantity(item.getQuantity().add(request.getCartDetail().getQuantity()));
                cartDetail = item;
                productExists = true;
                break;
            }
        }

        // Nếu sản phẩm chưa tồn tại, tạo CartDetail mới
        if (!productExists) {
            cartDetail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getCartDetail().getQuantity())
                    .build();
            cart.getCartDetails().add(cartDetail);
        }

        cart = cartRepository.save(cart);
        return SingleCartResponse.builder()
                .id(cart.getId())
                .cartDetails(cartDetailMapper.toCartDetailResponse(cartDetail))
                .build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public Page<CartResponse> getAllCarts(Pageable pageable) {
        var carts = cartRepository.findAll(pageable);
        return carts.map(cartMapper::toCartResponse);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public CartResponse getCart(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user)
                ? cartRepository.findByUser(user)
                : Cart.builder().user(user).cartDetails(new HashSet<>()).build();
        return cartMapper.toCartResponse(cart);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public SingleCartResponse updateCart(CartRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user)
                ? cartRepository.findByUser(user)
                : Cart.builder().user(user).cartDetails(new HashSet<>()).build();
        var product = productRepository.findById(request.getCartDetail().getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));

        if (cart.getCartDetails() == null) {
            cart.setCartDetails(new HashSet<CartDetail>());
        }

        boolean productExists = false;
        CartDetail cartDetail = new CartDetail();
        for (CartDetail item : cart.getCartDetails()) {
            if (item.getProduct().getId().equals(product.getId())) {
                // Sản phẩm đã tồn tại, tăng số lượng
                item.setQuantity(item.getQuantity().add(request.getCartDetail().getQuantity()));
                cartDetail = item;
                productExists = true;
                break;
            }
        }

        // Nếu sản phẩm chưa tồn tại, tạo CartDetail mới
        if (!productExists) {
            cartDetail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getCartDetail().getQuantity())
                    .build();
            cart.getCartDetails().add(cartDetail);
        }

        cart = cartRepository.save(cart);
        return SingleCartResponse.builder()
                .id(cart.getId())
                .cartDetails(cartDetailMapper.toCartDetailResponse(cartDetail))
                .build();
    }

    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public void deleteCart(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        cartRepository.existsByUser(user);
    }

    private Set<CartDetailResponse> fromCartToCartDetailResponse(Cart cart) {
        return cart.getCartDetails().stream()
                .map(cartDetail -> CartDetailResponse.builder()
                        .product(productMapper.toProductResponse(cartDetail.getProduct()))
                        .quantity(cartDetail.getQuantity())
                        .build())
                .collect(Collectors.toSet());
    }
}
