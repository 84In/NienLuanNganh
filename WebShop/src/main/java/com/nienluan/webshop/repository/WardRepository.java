package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, Integer> {
}
