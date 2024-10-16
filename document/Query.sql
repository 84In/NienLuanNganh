select * from `t_users`;
select * from `t_users` where id = '899ce33f-02ef-487b-9872-484c6cd77162';
select * from `t_addresses`;
select * from `t_provinces`;
select * from `t_carts`;
select * from `t_cart_details`;
select * from `t_promotions`;
select * from `t_products`;
select * from `t_categories`;
select * from `t_payment_methods`;
select * from `t_status_order`;
select * from `t_orders`;
select * from `t_order_details`;
select c.id, c.user_id, cd.quantity, p.id, p.brand_id, p.category_id, p.name, p.price, p.stock_quantity from `t_carts` c join `t_cart_details` cd on c.id = cd.cart_id join `t_products` p on cd.product_id = p.id;
select `id`, `name` from `t_brands`;
select `id`, `name`, `description`, `price`, `stock_quantity`, `images`, `category_id`, `brand_id` from `t_productsflyway_schema_history`;	

