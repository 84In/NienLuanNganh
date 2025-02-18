package com.nienluan.webshop.service;

import com.nienluan.webshop.entity.Payment;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.utils.HMACUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;


    @Slf4j
    @Service
    @RequiredArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
    public class ZaloPayService {

        @Value("${payment.zalopay.appid}")
        @NonFinal
        int appid;

        @Value("${payment.zalopay.key1}")
        @NonFinal
        String key1;
        @Value("${payment.zalopay.key2}")
        @NonFinal
        String key2;

        @Value("${payment.zalopay.create.endpoint}")
        @NonFinal
        String createEndpoint;
        @Value("${payment.zalopay.query.endpoint}")
        @NonFinal
        String queryEndpoint;
        @Value("${payment.zalopay.returnUrl}")
        @NonFinal
        String returnUrl;
        @Value("${payment.zalopay.callback}")
        @NonFinal
        String callback;

        public Map<String,Object> createOrder(Order order){

            Map<String, Object> orderData = new HashMap<>();

            //Tao uuid
            String apptransid = getCurrentTimeString()+ "_" + order.getId();
            long apptime = System.currentTimeMillis();

            //Nhung du lieu va chi tiet mat hang tu order
            Map<String,String> embeddata = new HashMap<>();
            embeddata.put("redirecturl", callback);

            //lay thong tin tien hanh thanh toan
            orderData.put("appid", appid);
            orderData.put("apptransid", apptransid);
            orderData.put("apptime", apptime);
            orderData.put("appuser", order.getUser().getUsername());
            orderData.put("amount",order.getTotalAmount());
            orderData.put("bankcode","");
            orderData.put("item","");
//            orderData.put("callbackurl",callback);
            orderData.put("description","Payment for order "+order.getId());
            orderData.put("embeddata", new JSONObject(embeddata).toString());

            //chu ky mac
//        String data = String.format("%s|%s|%s|%s|%d|%s", appid,apptransid,order.getUser().getUsername(),order.getTotalAmount().toString(),apptime,gson.toJson(embeddata).toString());
//        String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256,key1, data);
//        orderData.put("mac", mac);
            String data = orderData.get("appid") +"|"+ orderData.get("apptransid") +"|"+ orderData.get("appuser") +"|"+ orderData.get("amount")
                    +"|"+ orderData.get("apptime") +"|"+ orderData.get("embeddata") +"|"+ orderData.get("item");
            orderData.put("mac", HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, key1, data));

            return orderData;

        }
        public Map<String, Object> createdRefund(Payment payment){
            Long timestamp = System.currentTimeMillis();
            Map<String, Object> order = new HashMap<>(){{
                put("appid", appid);
                put("zptransid", payment.getZpTransId());
                put("mrefundid", getCurrentTimeString()+"_"+appid+"_"+UUID.randomUUID());
                put("timestamp", timestamp);
                put("amount", payment.getAmount());
                put("description","Khách hàng huỷ đơn hàng!");
            }};
            String data = order.get("appid") +"|"+ order.get("zptransid") +"|"+ order.get("amount")
                    +"|"+ order.get("description") +"|"+ order.get("timestamp");
            order.put("mac", HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, key1, data));
            return order;
        }

        private static String getCurrentTimeString() {
            Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
            SimpleDateFormat fmt = new SimpleDateFormat("yyMMdd");
            fmt.setCalendar(cal);
            return fmt.format(cal.getTimeInMillis());
        }


    }
