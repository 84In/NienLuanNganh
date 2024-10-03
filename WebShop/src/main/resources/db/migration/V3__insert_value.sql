/*
-- Query: SELECT * FROM webshop.t_categories
-- Date: 2024-09-27 22:53
*/
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('08f26e2e-e97a-4f11-b216-9abbd80bb2a2','Giày','giay','/images/category/Giày/giay.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('540dc5c3-8532-4e64-8f8b-c05481aa3230','Điện Lạnh','dien-lanh','/images/category/Điện Lạnh/dienlanh.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('674aab9b-731a-4b03-ae0e-457140c921e8','Sách','sach','/images/category/Sách/sach.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('8a3e56de-c5c4-4e67-a7da-d2b396a336b9','Túi Xách Nữ','tui-xach-nu','/images/category/Túi Xách Nữ/tuixachnu.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('8b4581ae-00e2-4dd0-a8ec-4008952201cf','LapTop','laptop','/images/category/LapTop/laptop.jpg');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('d193bbcc-f027-475b-844b-1c5045a87245','Balo','balo','/images/category/Balo/balo.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('d8f05c1d-72d7-46ca-9fa1-e9956617e143','Xe máy','xe-may','/images/category/Xe máy/xemay.png');
INSERT INTO `t_categories` (`id`,`name`,`code_name`,`images`) VALUES ('e3aabcbf-d7a8-4289-91e9-92afb39acb2f','Điện Thoại','dien-thoai','/images/category/Điện Thoại/dienthoai.png');

/*
-- Query: select `id`, `name` from `t_brands`
LIMIT 0, 100

-- Date: 2024-10-03 23:54
*/
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('df457abf-1064-4248-bba5-27b5d5672707','');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('58b0cc6c-6553-4bfe-836f-4ff7cc3de4bf','Acer');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('c4044f79-c897-46e2-9155-cb89ca004ba7','Aldo');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('69b61e81-66ec-440e-a7ea-9d7257965e82','American Tourister');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('5fb9d001-3cf2-4376-86de-f1c835a10a54','ANANSHOP688');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('98960f81-ae16-45c8-b667-ff092244b2b4','anello');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('42d01813-dba3-439f-9b9f-97c6a4e9945f','Apple');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e0848209-783b-4476-a25b-c5155c40d5a9','Aprilia');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('0aa16ef4-5689-4bb2-b5fd-5c20968c37fd','Aqua');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('6bbbcd87-e2ec-4fc0-95b3-d6510804b27b','ARCTIC HUNTER');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('b10c9510-2c37-4cc8-b489-fb0ea9401048','Asus');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('577fabd2-156c-4622-9607-31f8c5f82933','Balzio');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('c2c065cb-8cbe-449d-93f8-c9f21a5ba145','BAMOZO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d09d2352-c3c0-4ddf-b561-ae4b36ceb386','Bee Gee');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('39fde3af-2e64-441c-a6d3-12e979eb1df1','Besti');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('0290924e-34e4-40f5-bc8a-0056c932a917','Biti\'s');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('f16ba957-3616-4399-8a93-e2ce26700039','Bobo');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('1a87ccdc-bd5c-4116-9e57-ba4b544f4f03','Casio');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('60a44b1c-ab6c-4946-b4fb-ce23ee953e68','Chuwi');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a36e8287-8c31-4424-bf91-05a32f7c73b5','Converse');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e4be1de2-c641-4838-8db6-b70b7b8ceace','DD STORE');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('b5ea48a6-6ebc-4687-9ee7-aaf8887866bb','Dell');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('be1f848c-0160-40f6-9b8c-68ab302322c0','Detech');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('0719d591-aad7-490b-be34-12318d490f05','DINCOX');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('02d97d26-82e2-4598-a8c3-9975c60cf876','DOWON');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e71d6218-cee1-4087-aa3b-03c2105b2ba3','DRU');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('ee7622ad-783a-4372-be8e-8c2053001bf1','Ecco');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e8379ce2-02cd-405e-9727-554624fd794d','Electrolux');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('51bc43a8-a7b6-47c7-ac23-ff455f19860d','Elly');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('232ed2a9-0ced-4d6e-a2db-903d4564ac17','Espero');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('18ad9196-b322-4640-88bb-874ff6ad195c','Fits All');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('79c28d71-232e-4c26-a284-2efab80448a8','FitsAll');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('126c4e0a-415f-4baf-810d-9f3799dbf64a','Forever Young');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d4c937ea-401c-4865-beb6-8be03d3c8cdd','FWD');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('47f2e53d-a496-43bc-8c34-0300cb5fdb9e','Galaxy Store');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('f2b31490-9222-4e74-807c-3a4254876a20','Gence');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d70511df-d0ff-4b06-899f-847e6cb6e028','GEOX');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('3be51035-a76d-46d1-94b4-a908d9b0518f','GREPACO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d6244308-8916-4a62-8a13-72e27d9ae13f','Gro-Fa');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('cdc01c5b-5547-4c99-80c0-81eb17b6d51b','Gubag');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d1031725-5065-49b4-89e8-c9029a40c142','HARAS');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('4c618aa4-6164-43a9-81f4-a13da51b3cc2','HENRYSA Bạn của mọi nhà');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a4c36596-c25d-4c79-a8ac-91496cd3f4cd','Honda');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e13e6d91-3ca6-438c-be09-92b529cf1b00','Honor');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('40272a9a-bec9-46a9-815d-e4e4f2e24dc8','HP');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('9179f62c-b115-4dae-b792-4a10c1868836','Huy Hoàng');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('39855f1e-7e6d-4466-9001-497c82c8dfa4','IDIGO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('5943fe6c-cd7d-470e-aa45-06a94fc766c0','Itel');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('7c3c24bc-6ae0-422b-9801-eabdbb563244','Juno');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('4de152b4-456f-4a5c-81fe-c8a662a65324','Kai Nguyễn');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('51a4d1eb-3c2a-4b5f-9459-b0e564a9ecde','KYMCO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('8f94b631-d173-4764-b5de-6169c9280a0a','LALUNAVN');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('9f6343ad-42fe-4768-84bb-7d768c0c28b4','Lata');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('49f58aba-fde1-44d6-aae4-024306dfe9ab','Lazy Box');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('9eacf4f3-7e1d-4308-a43a-f504bfe44252','Lenovo');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('b7697704-02fe-4b4f-b4f5-5224fc2f44e8','LEROSV');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('014ff734-73f1-4a32-91c2-53375a24e7c7','LG');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('96d7910b-9e73-4a07-90c9-c92cb8302b32','LimenCo');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('458f3b8c-ed44-469e-9632-5d774a8e7d21','Lowepro');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('38a7e73a-9d86-4744-86fe-4f24c2aefb6a','Macsim');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a64edfb3-712a-496c-8f7f-f05f81e98a6a','MAGIX');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('695d74cb-9a31-4d4d-8ebd-7b05a4b5bb6e','May 10');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e3d72f2f-1865-424e-a834-c572285bf51a','MCM');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('953cbd1f-b51a-40b9-8c7a-e3f06354278b','Medicare');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('c71576cc-220f-4fae-a249-162aa4d03cdd','MICOCAH');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('6f5c206d-5ada-498a-a93d-61d835b0f038','miDoctor');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('c2ce427f-601e-42b4-96b9-11cad3660968','Mikkor');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a7850d59-fd36-42b1-ae6e-9a2bdc91c88c','Mira');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('728b4b51-3824-460a-81db-8da68e5ffdb6','mirrortowers MT');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('87a2a468-2170-4e6f-b4bf-4717b0a0c56f','MLB');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d5789b5c-fb39-4a4b-b4a1-2e5dbe8e17f6','Moto Guzzi');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('bebcc603-ca4b-4edf-9b62-68f0910ade12','MRVUI');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('90267bfe-a0d1-4c37-b2e0-80c860df7a78','MSI');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a7a807c9-a508-4b04-918d-1ea3b926a3b0','Native');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d7c4b9fe-f683-4b74-9d29-64ee2bf66084','NATOLI');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('d7d33768-8fe2-4393-9202-044cf77a5449','NAVIVU');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('f21ad7fd-9e2e-4232-ae59-91e19cbf9bd5','Nice Villa');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('ffd83dba-6189-45b2-aac3-cac3ce6bcc3e','Nike');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('eb1af90a-3b54-46d6-b530-5399ce3c2cb8','Nokia');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('1588bfda-2b82-4017-8fd8-e560cfcb4767','Nutushop');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('a085a956-e785-45d6-937f-3c2583a95018','OEM');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('2461a6c9-8060-499a-8cea-25c7ef0abe90','OPPO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('14a11e10-406d-44d1-a02e-ac4f0246888c','Oukitel');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('853d0cb2-f71b-4355-bdbb-fb235682ce8d','PaKaSa');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('78b6c5cb-ab97-48e7-89e6-3f7c7f188959','Panasonic');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('dabbf473-4412-4f4d-abbf-ac05e62ce985','Parabol');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('92a1b309-b001-491e-adb7-3617aa0761ad','Piaggio');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('7bf161b8-9691-487b-b94c-0eefd9d96fce','POCO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('41484dd2-2c14-4b46-89d5-5da4a4aca098','Praza');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('11d7a01c-528a-4794-a473-9f3412b7351f','Realme');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('4cbcabbf-f7ec-4097-96b4-ba145889e2ee','REEYEE');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('665f4430-d036-4e45-bd67-65f7d10f9e34','Ringke');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('22f314e5-fcd8-4f5b-a1f2-2562204d87e0','Sakos');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('0cc85a22-5035-42f8-8597-685c6088ecf1','Samsung');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('234d5add-068e-4838-8d21-b6f80b7a764b','Shalla');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('1ad9658a-7392-4fd1-a8ad-244f9dc283ce','SimpleCarry');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('14a3d8df-0b30-4e6f-b776-a01eaa67dd00','SmileBox');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('171041bc-5d0e-4786-8cb5-c35ab58328eb','Sony');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('e4368bf2-b778-43a8-a4dc-3910aeb51620','STARGO');
-- INSERT INTO `t_brands` (`id`,`name`) VALUES ('f2815eb0-a9c1-443b-9ed4-d0963b0e1344','SUZIN');
--
