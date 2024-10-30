package com.nienluan.webshop.service;

import org.json.JSONObject;
import com.nienluan.webshop.dto.response.ZaloPayResponse;
import com.nienluan.webshop.entity.Order;
import com.nienluan.webshop.utils.HMACUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ZaloPayService {
    @Value("${payment.zalopay.appid}")
    @NonFinal
    String appid;

    @Value("${payment.zalopay.key1}")
    @NonFinal
    String key1;

    @Value("${payment.zalopay.key2}")
    @NonFinal
    String key2;

    @Value("${payment.zalopay.endpoint}")
    @NonFinal
    String endpoint;
    private static final Logger logger = LoggerFactory.getLogger(Logger.class);

    public ZaloPayResponse createOrder(Order order) throws IOException {
        Map<String, Object> orderData = new HashMap<>();

        //Tao uuid
        String apptransid = getCurrentTimeString("yyMMdd")+"_" + UUID.randomUUID();
        long apptime = System.currentTimeMillis();

        //Nhung du lieu va chi tiet mat hang tu order
        Map<String,String> embeddata = new HashMap<>();
        embeddata.put("orderId", order.getId());
        embeddata.put("redirecturl", "http://localhost:3000");

        //lay thong tin tien hanh thanh toan
        orderData.put("appid", appid);
        orderData.put("apptransid", apptransid);
        orderData.put("apptime", apptime);
        orderData.put("appuser", order.getUser().getUsername());
        orderData.put("amount",order.getTotalAmount());
        orderData.put("bankcode","");
        orderData.put("item","");
        orderData.put("description","Payment for order "+order.getId());
        orderData.put("embeddata", new JSONObject(embeddata).toString());

        //chu ky mac
//        String data = String.format("%s|%s|%s|%s|%d|%s", appid,apptransid,order.getUser().getUsername(),order.getTotalAmount().toString(),apptime,gson.toJson(embeddata).toString());
//        String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256,key1, data);
//        orderData.put("mac", mac);
        String data = orderData.get("appid") +"|"+ orderData.get("apptransid") +"|"+ orderData.get("appuser") +"|"+ orderData.get("amount")
                +"|"+ orderData.get("apptime") +"|"+ orderData.get("embeddata") +"|"+ orderData.get("item");
        orderData.put("mac", HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, key1, data));

        //gui request zalopay
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(endpoint);

        List<NameValuePair> params = new ArrayList<>();
        for (Map.Entry<String, Object> entry : orderData.entrySet()){
            params.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
        }

        post.setEntity(new UrlEncodedFormEntity(params));
        CloseableHttpResponse response = client.execute(post);

        BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            resultJsonStr.append(line);
        }
        logger.info(resultJsonStr.toString());
        JSONObject jsonObject = new JSONObject(resultJsonStr.toString());
        ZaloPayResponse zaloPayResponse = new ZaloPayResponse();
        zaloPayResponse.setZptranstoken(jsonObject.optString("zptranstoken", ""));
        zaloPayResponse.setOrderurl(jsonObject.optString("orderurl", ""));
        zaloPayResponse.setReturncode(jsonObject.optInt("returncode", -1));
        zaloPayResponse.setReturnmessage(jsonObject.optString("returnmessage", ""));
        return zaloPayResponse;

    }

    private static String getCurrentTimeString(String format) {
        Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
        SimpleDateFormat fmt = new SimpleDateFormat(format);
        fmt.setCalendar(cal);
        return fmt.format(cal.getTimeInMillis());
    }

}
