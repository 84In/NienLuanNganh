package com.nienluan.webshop.dto.request;

import com.nienluan.webshop.entity.Order;
import jakarta.persistence.OneToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigInteger;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentRequest {
    Date paymentDate;
    BigInteger amount;
    String status;
}
