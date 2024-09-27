package com.nienluan.webshop;

import com.nienluan.webshop.service.DataLoaderService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.InputStream;

@SpringBootApplication
public class WebShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebShopApplication.class, args);
    }
}
