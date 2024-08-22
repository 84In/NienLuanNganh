package com.trungtin.webshop.service;

import com.trungtin.webshop.entity.Role;
import com.trungtin.webshop.entity.User;
import com.trungtin.webshop.mapper.UserMapper;
import com.trungtin.webshop.repository.RoleRepository;
import com.trungtin.webshop.repository.UserRepository;
import com.trungtin.webshop.dto.request.UserCreation;
import com.trungtin.webshop.dto.response.UserResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreation request) {
        if (userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException();
        }
        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        var role = roleRepository.findByName("USER");

        Set<Role> roles = new HashSet<>();

        roles.add(role);

        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }



}
