package com.nienluan.webshop.config;

import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @NonFinal
    @Value("${file.upload-dir}")
    private String UPLOADS_DIR;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        File uploadsDir = new File(UPLOADS_DIR);
        if (!uploadsDir.exists()) {
            uploadsDir.mkdirs(); // Tạo thư mục
        }

        // Ánh xạ URL "/images/**" tới thư mục uploads
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + UPLOADS_DIR);
    }
}
