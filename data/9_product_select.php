<?php
/**
接收客户端提交的指定的页号，分页向客户端输出产品信息，以JSON格式
**/
header('Content-Type: application/json;charset=UTF-8');

//读取客户端提交的要显示的页号
@$pageNum = $_REQUEST['pageNum'];
if( ! $pageNum ){
	$pageNum = 1; //若客户端未提交页号，则默认设置为1
}else {  //HTTP请求消息中的数据都是字符串
	$pageNum = intval($pageNum);  //解析为整数
}

//向要客户端输出的关联数组——JSON对象
$output = [
	'recordCount'=>0,			//符合条件的总记录数
	'pageSize'=>6,				//每页最多显示的记录数
	'pageCount'=>0,				//总的页数
	'pageNum'=>$pageNum,	//当前要显示的页号
	'data'=>[]						//当前页中的记录行
];


require('0_init.php');

//SQL1: 获取满足条件的总的记录数
$sql = "SELECT COUNT(*) FROM hupo_product";
$result = mysqli_query($conn,$sql);
$output['recordCount'] = intval( mysqli_fetch_row($result)[0] );
//计算总的页数
$output['pageCount'] = ceil( ($output['recordCount'])/($output['pageSize']) );

//SQL2: 读取当前页中的数据
$start = ($output['pageNum']-1)*$output['pageSize']; //从哪一行开始读取，从0开始
$count = $output['pageSize']; //一次最多读取的记录行数
$sql = "SELECT * FROM hupo_product LIMIT $start,$count";  //MySQL中的分页查询
$result = mysqli_query($conn, $sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);