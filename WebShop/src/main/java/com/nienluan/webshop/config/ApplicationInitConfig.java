package com.nienluan.webshop.config;


import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.entity.User;
import com.nienluan.webshop.repository.RoleRepository;
import com.nienluan.webshop.repository.UserRepository;
import com.nienluan.webshop.service.DataLoaderService;
import com.nienluan.webshop.utils.DateUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.InputStream;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    private static final Logger log = LoggerFactory.getLogger(ApplicationInitConfig.class);
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner addDefaultUserAndRole(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {

            if (roleRepository.findById("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");
                adminRole.setDescription("Admin");
                roleRepository.save(adminRole);
            }
            if (roleRepository.findById("USER").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName("USER");
                adminRole.setDescription("Customer");
                roleRepository.save(adminRole);
            }

            if (userRepository.findByUsername("admin").isEmpty()) {
                var role = roleRepository.findById("ADMIN");
                var adminRole = new HashSet<Role>();
                adminRole.add(role.stream().findFirst().get());
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .firstName("admin")
                        .lastName("ADMIN")
                        .dob(DateUtils.formatStringToLocalDate("1900-01-01"))
                        .phone("18001000")
                        .roles(adminRole)
                        .build();
                userRepository.save(user);
                log.warn("Default admin user has bean created with default password: admin, please change!");
            }
        };
    }

    @Bean
    ApplicationRunner addDataProvinces(DataLoaderService dataLoaderService) {
        return args -> {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("dataProvinces.json");
            if (inputStream != null) {
                dataLoaderService.loadDataFromJson(inputStream);
            } else {
                System.err.println("File dataProvinces.json không tồn tại trong classpath.");
            }
            log.warn("Data VietNam location is successfully loaded!");
        };
    }
}
