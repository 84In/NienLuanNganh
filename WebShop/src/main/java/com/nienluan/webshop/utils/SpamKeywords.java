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
                "con chó",
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

    public static String messageWarning() {
        return "Đánh giá vi phạm chính sách tiêu chuẩn cộng đồng của chúng tôi!";
    }
}
