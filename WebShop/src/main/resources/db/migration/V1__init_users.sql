CREATE TABLE `t_provinces`
(
    `id`            int AUTO_INCREMENT PRIMARY KEY,
    `code_name`     varchar(255) NOT NULL,
    `name`          varchar(255) NOT NULL,
    `division_type` varchar(255) NOT NULL
);


CREATE TABLE `t_districts`
(
    `id`            int AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(255) NOT NULL,
    `division_type` varchar(255) NOT NULL,
    `code_name`     varchar(255) NOT NULL,
    `province_code` int          NOT NULL,
    CONSTRAINT fk_province_id FOREIGN KEY (`province_code`) REFERENCES t_provinces (`id`) ON DELETE CASCADE
);


CREATE TABLE `t_wards`
(
    `id`            int AUTO_INCREMENT PRIMARY KEY,
    `name`          varchar(255) NOT NULL,
    `division_type` varchar(255) NOT NULL,
    `code_name`     varchar(255) NOT NULL,
    `district_code` int          NOT NULL,
    CONSTRAINT fk_district_id FOREIGN KEY (`district_code`) REFERENCES t_districts (`id`) ON DELETE CASCADE
);


CREATE TABLE `t_addresses`
(
    `id`        varchar(255) NOT NULL,
    `full_name` text         NOT NULL,
    `province`  int          NOT NULL,
    `district`  int          NOT NULL,
    `ward`      int          NOT NULL,
    `street`    text DEFAULT NULL,
    CONSTRAINT fk_province_code FOREIGN KEY (`province`) REFERENCES t_provinces (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_district_code FOREIGN KEY (`district`) REFERENCES t_districts (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_ward_code FOREIGN KEY (`ward`) REFERENCES t_wards (`id`) ON DELETE CASCADE,
    primary key (`id`)
);

CREATE TABLE `t_users`
(
    `id`         varchar(255) NOT NULL,
    `username`   varchar(255) NOT NULL UNIQUE,
    `password`   varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name`  varchar(255) NOT NULL,
    `email`      varchar(255) DEFAULT NULL,
    `phone`      varchar(255) NOT NULL UNIQUE,
    `avatar`     text         DEFAULT NULL,
    `dob`        Date         NOT NULL,
    `address`    varchar(255) DEFAULT NULL,
    `status`     INT          DEFAULT 0,
    `created_at` DATETIME     DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_address FOREIGN KEY (`address`) REFERENCES t_addresses (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);


CREATE TABLE `t_roles`
(
    `name`        varchar(255) NOT NULL,
    `description` varchar(255) DEFAULT NULL,
    `created_at`  DATETIME     DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`name`)
);

CREATE TABLE `t_users_roles`
(
    `users_id`   varchar(255) NOT NULL,
    `roles_name` varchar(255) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (`users_id`) REFERENCES t_users (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (`roles_name`) REFERENCES t_roles (`name`) ON DELETE CASCADE,
    PRIMARY KEY (`users_id`, `roles_name`)
);
CREATE TABLE `t_brands`
(
    `id`         varchar(255) NOT NULL,
    `name`       varchar(255) NOT NULL UNIQUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_categories`
(
    `id`         varchar(255) NOT NULL,
    `name`       varchar(255) NOT NULL UNIQUE,
    `code_name`  varchar(255) NOT NULL UNIQUE,
    `images`     text     DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_products`
(
    `id`             varchar(255) NOT NULL,
    `name`           varchar(255) NOT NULL UNIQUE,
    `description`    text       DEFAULT NULL,
    `price`          bigint(20),
    `stock_quantity` bigint(20) DEFAULT 0,
    `images`         text       DEFAULT NULL,
    `category_id`    varchar(255) NOT NULL,
    `brand_id`       varchar(255) NOT NULL,
    `created_at`     DATETIME   DEFAULT CURRENT_TIMESTAMP,
    `updated_at`     DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (`category_id`) REFERENCES t_categories (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_brand FOREIGN KEY (`brand_id`) REFERENCES t_brands (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);


CREATE TABLE `t_payment_methods`
(
    `id`         varchar(255) NOT NULL,
    `name`       varchar(255) NOT NULL UNIQUE,
    `code_name`  varchar(255) NOT NULL UNIQUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_payments`
(
    `id`           varchar(255) NOT NULL,
    `payment_date` DATETIME     NOT NULL,
    `amount`       bigint(20)   NOT NULL,
    `status`       varchar(255) NOT NULL,
    `created_at`   DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);


CREATE TABLE `t_status_order`
(
    `id`         varchar(255) NOT NULL,
    `name`       varchar(255) NOT NULL UNIQUE,
    `code_name`  varchar(255) NOT NULL UNIQUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_orders`
(
    `id`                varchar(255) NOT NULL,
    `shipping_address`  text,
    `total_amount`      bigint(20),
    `status_id`         varchar(255) NOT NULL,
    `payment_method_id` varchar(255) NOT NULL,
    `payment_id`        varchar(255) DEFAULT NULL,
    `user_id`           varchar(255) NOT NULL,
    `created_at`        DATETIME     DEFAULT CURRENT_TIMESTAMP,
    `updated_at`        DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_payment_method FOREIGN KEY (`payment_method_id`) REFERENCES t_payment_methods (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_status_order FOREIGN KEY (`status_id`) REFERENCES t_status_order (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_payment_id FOREIGN KEY (`payment_id`) REFERENCES t_payments (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (`user_id`) REFERENCES t_users (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_order_details`
(
    `id`            varchar(255) NOT NULL,
    `quantity`      bigint(20)   NOT NULL,
    `price_at_time` bigint(20)   NOT NULL,
    `order_id`      varchar(255) NOT NULL,
    `product_id`    varchar(255) NOT NULL,
    `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_id FOREIGN KEY (`order_id`) REFERENCES t_orders (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_product_id FOREIGN KEY (`product_id`) REFERENCES t_products (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_reviews`
(
    `id`         varchar(255) NOT NULL,
    `rating`     int      DEFAULT 0,
    `comment`    text     default null,
    `user_id`    varchar(255) not null,
    `status`     BOOLEAN  DEFAULT TRUE,
    `product_id` varchar(255) not null,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_user_id FOREIGN KEY (`user_id`) REFERENCES t_users (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_review_product_id FOREIGN KEY (`product_id`) REFERENCES t_products (`id`) ON DELETE CASCADE,
    primary key (`id`)
);

CREATE TABLE `t_carts`
(
    `id`         varchar(255) not null,
    `user_id`    varchar(255) not null,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id_cart FOREIGN KEY (`user_id`) REFERENCES t_users (`id`) ON DELETE CASCADE,
    primary key (`id`)
);

CREATE TABLE `t_cart_details`
(
    `id`         varchar(255) not null,
    `quantity`   bigint(20)   not null,
    `cart_id`    varchar(255) not null,
    `product_id` varchar(255) not null,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_id FOREIGN KEY (`cart_id`) REFERENCES t_carts (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_product_id_cart FOREIGN KEY (product_id) REFERENCES t_products (`id`) ON DELETE CASCADE,
    primary key (`id`)
);

CREATE TABLE `t_promotions`
(
    `id`                  varchar(255) not null,
    `code`                varchar(255) not null Unique,
    `name`                varchar(255) not null,
    `description`         text,
    `discount_percentage` float        not null default 0.0,
    `start_date`          DATE         not null,
    `end_date`            DATE         not null,
    `created_at`          DATETIME              DEFAULT CURRENT_TIMESTAMP,
    `updated_at`          DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key (`id`)
);

CREATE TABLE `t_banner`
(
    `id`     varchar(255) not null,
    `title`  varchar(255) not null,
    `images` text         not null,
    primary key (`id`)
);

CREATE TABLE `t_products_promotions`
(
    `product_id`   varchar(255) NOT NULL,
    `promotion_id` varchar(255) NOT NULL,
    CONSTRAINT fk_productP FOREIGN KEY (`product_id`) REFERENCES t_products (`id`) ON DELETE CASCADE,
    CONSTRAINT fk_promotionP FOREIGN KEY (`promotion_id`) REFERENCES t_promotions (`id`) ON DELETE CASCADE,
    PRIMARY KEY (`product_id`, `promotion_id`)
);