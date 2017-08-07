<?php
/**
根据客户端提交的登录用户名，返回当前登录用户的购物车中的详情，形如：
[
  {"pid":10,"pname":"xx","pic":"x.jpg","price":1000,"count":3,"did":1},
  {"pid":15,"pname":"xx","pic":"x.jpg","price":1000,"count":1,"did":2},
  {"pid":18,"pname":"xx","pic":"x.jpg","price":1000,"count":2,"did":3}
]
**/
header('Content-Type: application/json;charset=UTF-8');

@$uname = $_REQUEST['uname'] or die('{"msg":"err", "reason":"uname required"}');

require('0_init.php');

//SQL1: 根据用户名查询出用户编号
$sql = "SELECT uid FROM hupo_user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row){
	$uid = $row[0];
}else {
	die('{"msg":"err", "reason":"uname non-exists"}');
}


//SQL2: 根据用户编号查询出购物车编号
$sql = "SELECT cid FROM hupo_cart WHERE userId='$uid'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row){   //有购物车
	$cid = $row[0];
}else {			//无购物车				
	die("[]");
}

//SQL3：根据购物车编号，查询出商品购买详情
$sql = "SELECT pid,pname,pic,price,count,did FROM hupo_product, hupo_cart_detail WHERE pid=productId AND cartId='$cid'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($list);
