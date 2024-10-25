/*
-- Query: SELECT * FROM webshop.t_categories
-- Date: 2024-09-27 22:53
*/
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('08f26e2e-e97a-4f11-b216-9abbd80bb2a2', 'Giày', 'giay', '/images/category/Giày/giay.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('540dc5c3-8532-4e64-8f8b-c05481aa3230', 'Điện Lạnh', 'dien-lanh', '/images/category/Điện Lạnh/dienlanh.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('674aab9b-731a-4b03-ae0e-457140c921e8', 'Sách', 'sach', '/images/category/Sách/sach.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('8a3e56de-c5c4-4e67-a7da-d2b396a336b9', 'Túi Xách Nữ', 'tui-xach-nu',
        '/images/category/Túi Xách Nữ/tuixachnu.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('8b4581ae-00e2-4dd0-a8ec-4008952201cf', 'LapTop', 'laptop', '/images/category/LapTop/laptop.jpg');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('d193bbcc-f027-475b-844b-1c5045a87245', 'Balo', 'balo', '/images/category/Balo/balo.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('d8f05c1d-72d7-46ca-9fa1-e9956617e143', 'Xe máy', 'xe-may', '/images/category/Xe máy/xemay.png');
INSERT INTO `t_categories` (`id`, `name`, `code_name`, `images`)
VALUES ('e3aabcbf-d7a8-4289-91e9-92afb39acb2f', 'Điện Thoại', 'dien-thoai',
        '/images/category/Điện Thoại/dienthoai.png');

/*
-- Query: select * from `t_payment_methods`
-- Date: 2024-10-14 21:44
*/
INSERT INTO `t_payment_methods` (`id`, `name`, `code_name`)
VALUES ('35868063-f3c8-415c-9614-fd6b72155857', 'VNPay', 'vnpay');
INSERT INTO `t_payment_methods` (`id`, `name`, `code_name`)
VALUES ('ae099c17-e2a4-4351-ae9b-07fd4a7e738f', 'Tiền mặt', 'cash');
INSERT INTO `t_payment_methods` (`id`, `name`, `code_name`)
VALUES ('bb66b1b6-c2ad-4630-95d6-e62fa335640e', 'ZaloPay', 'zalopay');

/*
-- Query: select * from `t_status_order`
-- Date: 2024-10-14 21:53
*/
INSERT INTO `t_order_status` (`id`, `name`, `code_name`)
VALUES ('290ac18c-887b-4a1f-b1bb-9686b40f37d8', 'Chờ xác nhận', 'pending');
INSERT INTO `t_order_status` (`id`, `name`, `code_name`)
VALUES ('2f498bfe-b96f-4191-a809-6c0bd606c4c8', 'Xác nhận', 'confirmed');
INSERT INTO `t_order_status` (`id`, `name`, `code_name`)
VALUES ('ab085525-a5f5-47b0-94a3-3fef2c4ba5fd', 'Đã hủy', 'cancelled');
INSERT INTO `t_order_status` (`id`, `name`, `code_name`)
VALUES ('c526b8e6-b7d5-46df-91d2-70c00885ff26', 'Hoàn tất', 'completed');
