package com.nienluan.webshop;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class WebShopApplicationTests {

    @Test
    void contextLoads() {
    }

}