package com.nienluan.webshop.mapper;

import com.nienluan.webshop.dto.request.RoleRequest;
import com.nienluan.webshop.dto.response.RoleResponse;
import com.nienluan.webshop.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    Role toRole(RoleRequest role);

    RoleResponse toRoleResponse(Role role);
}
