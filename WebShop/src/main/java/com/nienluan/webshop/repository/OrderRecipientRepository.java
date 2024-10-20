package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.OrderRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRecipientRepository extends JpaRepository<OrderRecipient, String> {
    Optional<OrderRecipient> findByFullNameAndPhoneAndAddress(String fullName, String phone, String address);
}
