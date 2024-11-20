package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.*;
import com.nienluan.webshop.dto.response.UserResponse;
import com.nienluan.webshop.entity.Address;
import com.nienluan.webshop.entity.Cart;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.entity.User;
import com.nienluan.webshop.exception.AppException;
import com.nienluan.webshop.exception.ErrorCode;
import com.nienluan.webshop.mapper.UserMapper;
import com.nienluan.webshop.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.nienluan.webshop.utils.DateUtils.formatStringToLocalDate;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    ProvinceRepository provinceRepository;
    DistrictRepository districtRepository;
    WardRepository wardRepository;
    AddressRepository addressRepository;
    CartRepository cartRepository;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.PHONE_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Optional<Role> role = roleRepository.findById("USER");
        Set<Role> roles = new HashSet<>();
        roles.add(role.stream().findFirst().get());
        user.setRoles(roles);
        log.info("User created: {}", user);

        return userMapper.toUserResponse(userRepository.save(user));
    }
    public UserResponse createUserByAdmin(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.PHONE_EXISTED);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Optional<Role> role = roleRepository.findById("ADMIN");
        Set<Role> roles = new HashSet<>();
        roles.add(role.stream().findFirst().get());
        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public Page<UserResponse> getAllUser(Pageable pageable) {
        var users = userRepository.findAll(pageable);
        return users.map(userMapper::toUserResponse);
    }
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public Page<UserResponse> getAllUserByKeyword(String keyword,Pageable pageable) {
        var users = userRepository.searchUserByKeyword(pageable,keyword);
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
    public UserResponse getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse updateUser(String id, UserUpdateRequest request) {
        var user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        var authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) {
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
    public UserResponse changePassword(ChangePasswordRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        boolean authentication = passwordEncoder.matches(request.getOldPassword(), user.getPassword());
        if (!authentication) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public UserResponse changePasswordByAdmin(ChangePasswordByAdminRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse changePersonalInformation(ChangePersonalInformationRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (request.getFirstName() != null && !request.getFirstName().isEmpty()) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null && !request.getLastName().isEmpty()) {
            user.setLastName(request.getLastName());
        }
        if (request.getDob() != null) {
            user.setDob(request.getDob());
        }
        if (request.getAvatar() != null && !request.getAvatar().isEmpty()) {
            user.setAvatar(request.getAvatar());
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse changeContactInformation(ChangeContactInformationRequest request) {
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            if (userRepository.existsByPhone(request.getPhone()) && !user.getPhone().equals(request.getPhone())) {
                throw new AppException(ErrorCode.PHONE_EXISTED);
            }
            user.setPhone(request.getPhone());
        }
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user.setEmail(request.getEmail());
        }
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public UserResponse changeAddressInformation(ChangeAddressRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Address address = user.getAddress() != null ? user.getAddress() : new Address();
        if (request.getFullName() != null && !request.getFullName().isEmpty()) {
            address.setFullName(request.getFullName());
        }
        if (request.getProvince() != null) {
            var province = provinceRepository.findById(request.getProvince())
                    .orElseThrow(() -> new AppException(ErrorCode.PROVINCE_NOT_EXISTED));
            address.setProvince(province);
        }
        if (request.getDistrict() != null) {
            var district = districtRepository.findById(request.getDistrict())
                    .orElseThrow(() -> new AppException(ErrorCode.DISTRICT_NOT_EXISTED));
            address.setDistrict(district);
        }
        if (request.getWard() != null) {
            var ward = wardRepository.findById(request.getWard())
                    .orElseThrow(() -> new AppException(ErrorCode.WARD_NOT_EXISTED));
            address.setWard(ward);
        }
        address.setStreet(request.getStreet());

        if (user.getAddress() == null) {
            address = addressRepository.save(address);
        }

        user.setAddress(address);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public long countNewUsersInLast7Days() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        return userRepository.countUsersCreatedInLast7Days(sevenDaysAgo);
    }

}
