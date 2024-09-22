package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.District;
import com.nienluan.webshop.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Integer> {

}
