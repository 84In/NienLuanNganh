package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.CartRequest;
import com.nienluan.webshop.dto.response.CartResponse;
import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.CartDetail;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.CartMapper;
import com.nienluan.webshop.repository.CartRepository;
import com.nienluan.webshop.repository.ProductRepository;
import com.nienluan.webshop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
public class CartService {

    CartRepository cartRepository;
    CartMapper cartMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartResponse createCart(CartRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user) ? cartRepository.findByUser(user) : Cart.builder().user(user).build();
        var product = productRepository.findById(request.getCartDetail().getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
        var existingCartDetail = cart.getCartDetails().stream()
                .filter(detail -> detail.getProduct().equals(product))
                .findFirst();
        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            cartDetail.setQuantity(cartDetail.getQuantity().add(request.getCartDetail().getQuantity()));
        } else {
            CartDetail newCartDetail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getCartDetail().getQuantity())
                    .build();
            cart.getCartDetails().add(newCartDetail);
        }
        cart = cartRepository.save(cart);
        return cartMapper.toCartResponse(cart);
    }

    public Page<CartResponse> getAllCarts(Pageable pageable) {
        var carts = cartRepository.findAll(pageable);
        return carts.map(cartMapper::toCartResponse);
    }

    public CartResponse getCart(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user) ? cartRepository.findByUser(user) : Cart.builder().user(user).build();
        return cartMapper.toCartResponse(cart);
    }

    public CartResponse updateCart(CartRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var cart = cartRepository.existsByUser(user) ? cartRepository.findByUser(user) : Cart.builder().user(user).build();
        var product = productRepository.findById(request.getCartDetail().getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTED));
        var existingCartDetail = cart.getCartDetails().stream()
                .filter(detail -> detail.getProduct().equals(product))
                .findFirst();
        if (existingCartDetail.isPresent()) {
            CartDetail cartDetail = existingCartDetail.get();
            cartDetail.setQuantity(request.getCartDetail().getQuantity());
        }else {
            CartDetail newCartDetail = CartDetail.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getCartDetail().getQuantity())
                    .build();
            cart.getCartDetails().add(newCartDetail);
        }
        cart = cartRepository.save(cart);
        return cartMapper.toCartResponse(cart);
    }

    public void deleteCart(String request) {
        cartRepository.deleteById(request);
    }


}
