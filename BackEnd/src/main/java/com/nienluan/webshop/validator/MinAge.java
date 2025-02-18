package com.nienluan.webshop.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MinAgeValidator.class)
public @interface MinAge {

    int min() default 10;

    String message() default "Bạn phải ít nhất {min} tuổi";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
