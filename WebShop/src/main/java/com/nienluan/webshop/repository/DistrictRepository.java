package com.nienluan.webshop.repository;

import com.nienluan.webshop.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface DistrictRepository extends JpaRepository<District, Integer> {
    @Query("SELECT d FROM District d WHERE d.province.id = :provinceId")
    List<District> findAllByProvince(@Param("provinceId") Integer provinceCode);
}
