package com.nienluan.webshop.validator;

import com.nienluan.webshop.validator.MinAge;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Period;

public class MinAgeValidator implements ConstraintValidator<MinAge, LocalDate> {

    private int minAge;


    @Override
    public void initialize(MinAge constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        this.minAge = constraintAnnotation.min();
    }

    @Override
    public boolean isValid(LocalDate dob, ConstraintValidatorContext context) {
        if (dob == null) {
            return false; // Không hợp lệ nếu không có ngày sinh
        }

        // Tính khoảng cách giữa ngày sinh và ngày hiện tại
        return Period.between(dob, LocalDate.now()).getYears() >= minAge;
    }
}
