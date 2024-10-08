package com.nienluan.webshop.dto.request;

import com.nienluan.webshop.entity.Payment;
import com.nienluan.webshop.entity.PaymentMethod;
import com.nienluan.webshop.entity.StatusOrder;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigInteger;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    String shippingAddress;
    BigInteger totalAmount;
    String status;
    String paymentMethod;
    String payment;
    String user;
    List<OrderDetailRequest> orderDetails;
}
