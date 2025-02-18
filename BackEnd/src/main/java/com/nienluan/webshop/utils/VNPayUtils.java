package com.nienluan.webshop.utils;

import jakarta.servlet.http.HttpServletRequest;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

public class VNPayUtils {
    public static String hmacSHA512(final String key, final String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String getIpAddress(HttpServletRequest request) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public static String getPaymentURL(Map<String, String> paramsMap, boolean encodeKey) {
        return paramsMap.entrySet().stream()
                .filter(entry -> entry.getValue() != null && !entry.getValue().isEmpty())
                .sorted(Map.Entry.comparingByKey())
                .map(entry ->
                        (encodeKey ? URLEncoder.encode(entry.getKey(),
                                StandardCharsets.US_ASCII)
                                : entry.getKey()) + "=" +
                                URLEncoder.encode(entry.getValue()
                                        , StandardCharsets.US_ASCII))
                .collect(Collectors.joining("&"));
    }

    public static String buildRefundData(Map<String, String> paramsMap) {
        return String.join("|",
                paramsMap.get("vnp_RequestId"),
                paramsMap.get("vnp_Version"),
                paramsMap.get("vnp_Command"),
                paramsMap.get("vnp_TmnCode"),
                paramsMap.get("vnp_TransactionType"),
                paramsMap.get("vnp_TxnRef"),
                paramsMap.get("vnp_Amount"),
                paramsMap.getOrDefault("vnp_TransactionNo", ""), // Không bắt buộc
                paramsMap.get("vnp_TransactionDate"),
                paramsMap.get("vnp_CreateBy"),
                paramsMap.get("vnp_CreateDate"),
                paramsMap.get("vnp_IpAddr"),
                paramsMap.get("vnp_OrderInfo")
        );
    }

    public static String buildQueryData(Map<String, String> paramsMap) {
        return String.join("|",
                paramsMap.get("vnp_RequestId"),
                paramsMap.get("vnp_Version"),
                paramsMap.get("vnp_Command"),
                paramsMap.get("vnp_TmnCode"),
                paramsMap.get("vnp_TxnRef"),
                paramsMap.getOrDefault("vnp_TransactionNo", ""), // Không bắt buộc
                paramsMap.get("vnp_TransactionDate"),
                paramsMap.get("vnp_CreateDate"),
                paramsMap.get("vnp_IpAddr"),
                paramsMap.get("vnp_OrderInfo")
        );
    }


}