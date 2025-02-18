package com.nienluan.webshop.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VNPayResponse {
    private String paymentUrl;
}
