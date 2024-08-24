package com.nienluan.webshop;

import org.springframework.boot.SpringApplication;

public class TestWebShopApplication {

    public static void main(String[] args) {
        SpringApplication.from(WebShopApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
