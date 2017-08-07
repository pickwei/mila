<?php
header('Content-Type: application/json;charset=UTF-8');
/**
*根据产品ID返回产品详情
*请求参数：
  pid-产品ID，必需
*输出结果：
  {
    "pid": 1,
    "title1":"xxx",
    ...
  }
*/
@$pid = $_REQUEST['pid'] or die('pid required');

require('0_init.php');

$sql = "SELECT * FROM hupo_product WHERE pid=$pid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output = $row;
}

echo json_encode($output);