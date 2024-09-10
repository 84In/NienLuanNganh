package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.UserCreationRequest;
import com.nienluan.webshop.dto.request.UserUpdateRequest;
import com.nienluan.webshop.entity.User;
import com.nienluan.webshop.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
