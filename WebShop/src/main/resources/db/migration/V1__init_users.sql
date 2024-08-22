CREATE TABLE `t_users`
(
    `id` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `first_name` text DEFAULT NULL,
    `last_name` text DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `phone` varchar(255) NOT NULL UNIQUE,
    `address` text DEFAULT NULL,
    `avatar` varchar(255) DEFAULT NULL,
    `dob` Date DEFAULT NULL,
    `role` varchar(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_roles`
(
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY ( `id`)
);

CREATE TABLE `t_user_roles`
(
    `user_id` varchar(255) NOT NULL,
    `role_id`  bigint(20) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(`user_id`) REFERENCES t_users(`id`) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY(`role_id`) REFERENCES t_roles(`id`) ON DELETE CASCADE,
    PRIMARY KEY(`user_id`, `role_id`)
);

CREATE TABLE `t_products`(
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` bigint(20),
  `inventory` bigint(20) DEFAULT 0,
  `type_id` varchar(255) NOT NULL,
  `image_id` varchar(255) NOT NULL,
  CONSTRAINT fk_type FOREIGN KEY(`type_id`) REFERENCES t_product_types(`id`) ON DELETE CASCADE,
  CONSTRAINT fk_images FOREIGN KEY(`image_id`) REFERENCES t_image_products(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`id`)
);

CREATE TABLE `t_product_types`(
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `t_image_products`(
    `id` varchar(255) NOT NULL,
    `images` text,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_bills`(
    `id` varchar(255) NOT NULL,
    'created_time' DATE NOT NULL DEFAULT CURRENT_TIME,
    `status_id` varchar(50) NOT NULL,
    `payment_method_id` varchar(255) NOT NULL
    CONSTRAINT fk_payment_method FOREIGN KEY(`payment_method_id`) REFERENCES t_payment_methods(`id`) ON DELETE CASCADE,
    CONSTRAINT fk_status_bill FOREIGN KEY(`status_id`) REFERENCES t_status_bills(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_status_bills`(
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL ,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_payment_methods`(
    `id` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL ,
    `payment_id` varchar(255) DEFAULT NULL,
    CONSTRAINT fk_payment FOREIGN KEY(`payment_id`) REFERENCES t_payments(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`id`)
);

CREATE TABLE `t_payments`(
    `id` varchar(255) NOT NULL,
    `status` boolean DEFAULT false,
    `exprice_time` DATE NOT NULL,
    `created_time` DATE NOT NULL,
    PRIMARY KEY (`id`)
);