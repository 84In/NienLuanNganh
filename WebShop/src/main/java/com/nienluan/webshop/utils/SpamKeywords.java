package com.nienluan.webshop.utils;

import java.util.Arrays;
import java.util.List;

public class SpamKeywords {
    public static List<String> getSpamKeywords() {
        return Arrays.asList(
                "cc",
                "mm",
                "cmm",
                "dcmm",
                "con chóoo",
                "fuxk",
                "fuck",
                "bitch",
                "con đĩ",
                "con ngu",
                "con điên",
                "lừa đảo",
                "đồ con choá",
                "đồ choá"
        );
    }
    public static String messageWarning(){
        return "Bạn đang vi phạm chính sách tiêu chuẩn cộng đồng của chúng tôi! Đánh giá này sẽ bị xoá sau 3 ngày thông báo!";
    }
}
