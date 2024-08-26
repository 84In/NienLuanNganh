CREATE TABLE `t_tokens`(
    `token` varchar(255) not null,
    `expiry_time` DATE not null,
    primary key (`token`)
);