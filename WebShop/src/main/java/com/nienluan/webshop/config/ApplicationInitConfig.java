package com.pmss0168.springdemo.config;

import com.pmss0168.springdemo.entity.Role;
import com.pmss0168.springdemo.entity.User;
import com.pmss0168.springdemo.enums.ErrorCode;
import com.pmss0168.springdemo.exception.AppException;
import com.pmss0168.springdemo.repository.RoleRepository;
import com.pmss0168.springdemo.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.type.descriptor.java.LocalDateJavaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    private static final Logger log = LoggerFactory.getLogger(ApplicationInitConfig.class);
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                var role = roleRepository.findById("ADMIN");
                var adminRole = new HashSet<Role>();
                adminRole.add(role.stream().findFirst().get());
                User user = User.builder()
                        .username("admin")
                        .firstName("ADMIN")
                        .lastName("ADMIN")
                        .birthDate(new LocalDateJavaType().fromString("1900-01-01"))
                        .password(passwordEncoder.encode("admin"))
                        .roles(adminRole)
                        .build();
                userRepository.save(user);
                log.warn("Default admin user has bean created with default password: admin, please change!");
            }
        };
    }
}
