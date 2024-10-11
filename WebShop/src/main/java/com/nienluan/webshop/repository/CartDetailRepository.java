package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, String> {
    Optional<CartDetail> findByProductIdAndCartId( String cartId, String productId);

}
