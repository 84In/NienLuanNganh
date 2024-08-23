package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.RoleRequest;
import com.nienluan.webshop.mapper.RoleMapper;
import com.nienluan.webshop.dto.response.RoleResponse;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {

    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleResponse createRole(RoleRequest request){
        return roleMapper.toRoleResponse(
                roleRepository.save(
                        roleMapper.toRole(request)
                )
        );
    }

    public List<RoleResponse> getAllRoles(){
        List<Role> roles = roleRepository.findAll();

        return roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toList());
    }
}
