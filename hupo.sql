SET NAMES UTF8;
DROP DATABASE IF EXISTS hupo;
CREATE DATABASE hupo CHARSET=UTF8;
USE hupo;

CREATE TABLE hupo_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  tel  VARCHAR(32)
);
INSERT INTO hupo_user VALUES
    (NULL, 'weipengjun', '123456',13006195515),
    (NULL, 'gexing', '123456',18064115475);

CREATE TABLE hupo_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(32),
  detail VARCHAR(32),
  price FLOAT(10,2),
  pic VARCHAR(32),
  pic_lg VARCHAR(32)
);
INSERT INTO hupo_product VALUES
(NULL,'鸡黄油老蜜圆珠未打孔','天然波兰鸡黄油老蜜圆珠未打孔 波罗的海琥珀',4680,'img/recommend_show_1.png','img/detail/detail_lg_1.png'),
(NULL,'天然老蜜鸡黄吊坠','天然老蜜鸡黄油路路通男女款 天然黄蜜吊坠男女款带证书',4880,'img/recommend_show_2.png','img/detail/detail_lg_2.png'),
(NULL,'天然全皮琥珀蜜蜡吊坠料','天然全皮琥珀原石蜜蜡原石原矿 10-20g吊坠料',384,'img/recommend_show_3.png','img/detail/detail_lg_3.png'),
(NULL,'纯天然鸡油黄水滴 ','纯天然鸡油黄水滴琥珀原石 男女士款蜜蜡吊坠无优化无烤色',10473,'img/recommend_show_4.png','img/detail/detail_lg_4.png'),
(NULL,'波罗的海鸡油黄蜜蜡戒指','18K黄金蜜蜡 波罗的海鸡油黄蜜蜡戒指 约2.55克',1480,'img/recommend_show_5.png','img/detail/detail_lg_5.png'),
(NULL,'天然琥珀蜜蜡吊坠','18K金天然琥珀蜜蜡吊坠 波罗的海 约1.5克 葫芦吊坠',1980,'img/recommend_show_6.png','img/detail/detail_lg_6.png'),
(NULL,'天然老蜜蜡把件吊坠','160克天然老蜜蜡把件吊坠 精巧白菜造型 孤品',576000,'img/recommend_show_7.png','img/detail/detail_lg_7.png'),
(NULL,'波罗的海老色蜜蜡手链','天然琥珀蜜蜡手串 26mm波罗的海老色蜜蜡手链',338600,'img/recommend_show_8.png','img/detail/detail_lg_8.png'),
(NULL,'葫芦琥珀蜜蜡','18K玫瑰金镶嵌蜜蜡吊坠 葫芦琥珀蜜蜡 葫芦吊坠',2616,'img/recommend_show_9.png','img/detail/detail_lg_9.png'),
(NULL,'天然蜜蜡耳钉 ','蜜蜡耳坠 天然蜜蜡耳钉 耳坠 镶嵌托帕石 爱的初现',6980,'img/recommend_show_10.png','img/detail/detail_lg_10.png'),
(NULL,'天然鸡油黄琥珀蜜蜡戒指','18K金天然鸡油黄琥珀蜜蜡戒指 1克蜜蜡 秋光暖玉',1799,'img/recommend_show_11.png','img/detail/detail_lg_11.png'),
(NULL,'手串手链项链','10mm*108蜜蜡珠串 配24K金珠 手串手链项链',225000,'img/recommend_show_12.png','img/detail/detail_lg_12.png'),
(NULL,'蜜蜡吊坠鸡油黄手串练手料','天然琥珀原石蜜蜡原石蜜蜡吊坠鸡油黄手串练手料',32,'img/recommend_show_13.png','img/detail/detail_lg_13.png'),
(NULL,'天然波罗的海蜜蜡原石','天然波罗的海蜜蜡原石琥珀原石全皮原矿',788,'img/recommend_show_14.png','img/detail/detail_lg_14.png'),
(NULL,'精选琥珀蜜蜡原石','原矿鸡油黄全皮 平安扣饼吊坠料',69,'img/recommend_show_15.png','img/detail/detail_lg_15.png'),
(NULL,'天然 蜜蜡琥珀原石 ','10-20g天然 蜜蜡琥珀原石 鸡油黄吊坠桶珠料 全皮原矿精选蜜蜡 吊坠 桶珠 原石',330,'img/recommend_show_16.png','img/detail/detail_lg_16.png');



CREATE TABLE hupo_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT
);
INSERT INTO hupo_cart VALUES( 100,  1 );
CREATE TABLE hupo_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT ,
  productId INT ,
  count INT
);
INSERT INTO hupo_cart_detail VALUES
(1, 100, 2, 3),
(2, 100, 3, 1),
(3, 100, 4, 2);


/********************************************/
#订单信息表
CREATE TABLE hupo_order(
  oid INT PRIMARY KEY AUTO_INCREMENT,
  rcvName VARCHAR(32),
  addr VARCHAR(128),
  payment INT,   #付款方式 1-货到付款  2-支付宝支付  3-京东支付  4-在线支付
  price FLOAT(10,2),
  orderTime BIGINT,
  status INT,  #订单状态 1-等待付款  2-派货中  3-运输中  4-订单完成  5-订单取消
  userId INT
);
INSERT INTO hupo_order VALUES
(1000000000,'魏朋君','深圳福田',1,1000,1471459354649,1,1),
(NULL,'刘强东','万寿西街2号',1,1000,1472459354649,2,1),
(NULL,'强东妈','万寿西街3号',2,1500,1473459354649,3,1),
(NULL,'强东爸','万寿西街4号',3,1600,1474459354649,4,1),
(NULL,'强东哥','万寿西街5号',4,1800,1475459354649,5,1),
(NULL,'强东弟','万寿西街7号',2,2100,1477459354649,2,1);

#订单详情表
CREATE TABLE hupo_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT,    #订单编号
  productId INT,  #商品编号
  count INT       #购买数量
);
INSERT INTO hupo_order_detail VALUES
(NULL, 1000000000, 1, 2),
(NULL, 1000000000, 2, 1),
(NULL, 1000000000, 3, 3),
(NULL, 1000000001, 4, 2),
(NULL, 1000000001, 5, 3),
(NULL, 1000000002, 6, 5),
(NULL, 1000000002, 7, 8),
(NULL, 1000000002, 8, 4),
(NULL, 1000000003, 9, 1),
(NULL, 1000000004, 10, 9),
(NULL, 1000000004, 11, 1),
(NULL, 1000000004, 12, 3),
(NULL, 1000000004, 13, 4),
(NULL, 1000000005, 14, 2),
(NULL, 1000000005, 15, 1);

CREATE TABLE hupo_cases(
  casesId INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(32),
  title VARCHAR(32),
  detail VARCHAR(256)
);
INSERT INTO hupo_cases VALUES
(NULL,'img/cases/cases_list_1.jpg','天然琥珀吊坠','蜜蜡是属于琥珀类的有机宝石，质地脂润、肌理细腻，触手温润。蜜蜡的色彩丰富，有的颜色透明晶亮，有的半透明，还有的不透明,但是色彩斑斓。作为佛家的七宝之一，蜜蜡具有很强的辟邪化煞的功能。蜜蜡是很珍贵的有机宝石，它的形成历经千万年，而且本身承载的药用价值，被中医誉为五宝之首。研究表明，蜜蜡所含的元素可加速新陈代谢，清除体内的毒素，提高机体的免疫力。科学证实，不同的蜜蜡所含的矿物元素和宇宙微量元素都不同，..'),
(NULL,'img/cases/cases_list_2.jpg','琥珀蜜蜡鸡油吊坠','琥珀芬芳的熏香味道能增强人的灵魂，带给他力量和勇气。用琥珀制成了烟筒、烟嘴和烟盒，认为它们拥有消毒的能力。琥珀还拥有保持器官不腐化的效力。它们作为防腐剂在古埃及法老王的木乃伊中被发现。在中国远古时，皇亲贵妇们就视琥珀为吉祥和意之物；新生儿佩戴可避难销灾，一生平安；新人戴上它可永保青春，夫妻和睦幸福，因为那时人们认为琥珀是“虎毙魄入地而成”正因为这个原因，佛教界也视琥珀为圣物。 关于琥珀医学的发源学..'),
(NULL,'img/cases/cases_list_3.jpg','天然老蜜蜡吊坠','佩戴蜜蜡可以起到很好的装饰作用，但是蜜蜡本性比较脆，硬度是比较低的，所以在配戴的时候不适宜受到外力的撞击，也不能用硬物去划伤它因为可能会出现细痕，不仅影响了蜜蜡的美观性，还影响了其价值。 蜜蜡的熔点是比较低的，所以平时在佩戴和存放的时候，不要长时间在烈日下曝晒，也不要放置在暖炉旁，温差太大的话，都可能导致蜜蜡出现裂纹。蜜蜡在存放时也是有讲究的，不用的时候最好使用密闭的胶带单独收藏，不要和钻石等其他..'),
(NULL,'img/cases/cases_list_4.jpg','手串手链项链','蜜蜡是自然界中最奇幻的珠宝之一。 它的成因众说纷纭，各界研究者提供共30多种关于蜜蜡形成的说法，其中一种最权威指出：蜜蜡乃地质时代“始新世”时期松树、枫树及其它针叶树之脂汁深埋地下，与空气、水源、土壤中的各种矿物质等等接触融合石化而成，距今已数千万年至一亿数千万年。在物理成分和化学成分上蜜蜡和琥珀没有区别，只是因其“色如蜜，光如蜡”而得名。所以，不少人把蜜蜡算作琥珀的一种。 蜜蜡起源于..'),
(NULL,'img/cases/cases_list_5.jpg','天然鸡油黄琥珀蜜蜡戒指','【树纹戒指 独家设计 蜜蜡戒指/指环 天然琥珀蜜蜡原石制作】独家设计的蜜蜡戒指 已梅花树的树纹为参考制作。使用的是优选的蜜蜡戒面 尺寸10*12mm 厚度足够 底部也为树纹处理，925银材质 表面电镀24K金 因为是我们自己加工 所以如果脱色可以免费重新电镀，同时也可以制作9K金、14K金、18K金版本(金做树纹会更精细)。');
