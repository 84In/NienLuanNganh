package com.trungtin.webshop.mapper;

import com.trungtin.webshop.entity.User;
import com.trungtin.webshop.dto.request.UserCreation;
import com.trungtin.webshop.dto.request.UserUpdate;
import com.trungtin.webshop.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreation request);
    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdate request);
}
