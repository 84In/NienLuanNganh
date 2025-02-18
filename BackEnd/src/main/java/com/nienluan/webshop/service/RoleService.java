package com.nienluan.webshop.service;

import com.nienluan.webshop.dto.request.RoleRequest;
import com.nienluan.webshop.mapper.RoleMapper;
import com.nienluan.webshop.dto.response.RoleResponse;
import com.nienluan.webshop.entity.Role;
import com.nienluan.webshop.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
public class RoleService {

    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleResponse createRole(RoleRequest request){
        var role = roleRepository.save(roleMapper.toRole(request));
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAllRoles(){
        List<Role> roles = roleRepository.findAll();

        return roles.stream().map(roleMapper::toRoleResponse).collect(Collectors.toList());
    }

    public void deleteRole(String request){
        roleRepository.deleteById(request);
    }

}
