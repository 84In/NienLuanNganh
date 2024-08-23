package com.trungtin.webshop.mapper;

import com.trungtin.webshop.dto.request.RoleRequest;
import com.trungtin.webshop.dto.response.RoleResponse;
import com.trungtin.webshop.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    Role toRole(RoleRequest role);

    RoleResponse toRoleResponse(Role role);
}
