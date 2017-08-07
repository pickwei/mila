<?php
/**
接收客户端注册时提交的用户名，验证是否被占用，存在输出ok 不存在输出  err
**/
header('Content-Type:text/plain;charset=UTF-8');

@$uname = $_REQUEST['uname'] or die('uname-required');

require('0_init.php');

$sql = "SELECT uid FROM hupo_user WHERE uname='$uname'";
$result = mysqli_query($conn, $sql);

//DQL: false或结果集
$row = mysqli_fetch_row($result);
if($row===null){		//查询结果集中没有一行记录
	echo 'ok';   //不存在说明可以注册
}else {
	echo 'err';
}
