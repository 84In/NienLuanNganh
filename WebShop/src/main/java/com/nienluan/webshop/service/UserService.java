package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.entity.User;
import com.nienluan.webshop.mapper.UserMapper;
import com.nienluan.webshop.repository.RoleRepository;
import com.nienluan.webshop.repository.UserRepository;
import com.nienluan.webshop.dto.response.UserResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException();
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        log.info("User created: {}", user);

        Optional<Role> role = roleRepository.findById("USER");

        Set<Role> roles = new HashSet<>();

        roles.add(role.stream().findFirst().get());

        user.setRoles(roles);

        log.info("User created: {}", user);

        return userMapper.toUserResponse(userRepository.save(user));
    }



}
