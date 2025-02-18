package com.nienluan.webshop.utils;


import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Slf4j
public class DateUtils {

    // Định dạng ngày
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static LocalDate formatStringToLocalDate(String date) {
        try {
            // Chuyển đổi chuỗi thành LocalDate
            return LocalDate.parse(date, DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            log.error(e.getMessage());
        }
        return null;
    }
}
