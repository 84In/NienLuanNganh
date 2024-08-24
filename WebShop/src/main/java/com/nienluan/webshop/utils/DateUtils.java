package com.nienluan.webshop.utils;


import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class DateUtils {
    @Bean
    public static Date formatDate(String date) {
        try{
            return new SimpleDateFormat("yyyy-MM-dd").parse(date);
        }
        catch (ParseException e){
            log.error(e.getMessage());
        }
        return null;
    }
}
