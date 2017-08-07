<?php
/**
接收客户端提交的用户名和密码，验证是否正确，向客户端输出ok或err
**/
header('Content-Type:application/json;charset=UTF-8');

@$uname = $_REQUEST['uname'] or die('uname-required');
@$upwd = $_REQUEST['upwd'] or die('upwd-required');

require('0_init.php');

$sql = "SELECT uid,uname FROM hupo_user WHERE uname='$uname' AND upwd='$upwd'";
$result = mysqli_query($conn, $sql);
//DQL: false或结果集
$row = mysqli_fetch_assoc($result);
if($row){
  $output['code'] = 1;
  $output['uid'] = intval($row['uid']);
  $output['uname'] = $row['uname'];
}else {
  $output['code'] = 400;
}

echo json_encode($output);