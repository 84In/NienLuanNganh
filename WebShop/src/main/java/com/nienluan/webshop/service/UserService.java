package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.ChangePasswordRequest;
import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.dto.request.UserUpdateRequest;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.entity.User;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.UserMapper;
import com.nienluan.webshop.repository.RoleRepository;
import com.nienluan.webshop.repository.UserRepository;
import com.nienluan.webshop.dto.response.UserResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
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
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        log.info("User created: {}", user.toString());
        Optional<Role> role = roleRepository.findById("USER");
        Set<Role> roles = new HashSet<>();
        roles.add(role.stream().findFirst().get());
        user.setRoles(roles);
        log.info("User created: {}", user);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public Page<UserResponse> getAllUser(Pageable pageable) {
        var users = userRepository.findAll(pageable);
        return users.map(userMapper::toUserResponse);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse getUserById(String id) {
        var user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse getUserByUsername(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }


    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse updateUser(String id, UserUpdateRequest request) {
        var user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        userMapper.updateUser(user, request);
        var roles = roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse changePassword(String id, ChangePasswordRequest request){
        var user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        boolean authentication = passwordEncoder.matches(request.getOldPassword(), user.getPassword());
        if(!authentication){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        if(!request.getNewPassword().equals(request.getReNewPassword())){
            throw new AppException(ErrorCode.PASSWORD_INCORRECT);
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }
}
