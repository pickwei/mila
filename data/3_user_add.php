<?php
/***
*接收客户端提交的uname和upwd和tel，保存入数据库，
*返回{"code": 1, "msg":"succ"}或{"code":2, "msg":"err", "sql":"..."}
*/
header('Content-Type: application/json;charset=UTF-8');

@$uname = $_REQUEST['uname'] or die('{"code":3,"msg":"uname required"}');
@$upwd = $_REQUEST['upwd'] or die('{"code":4,"msg":"upwd required"}');
@$tel = $_REQUEST['tel'] or die('{"code":4,"msg":"tel required"}');

require('0_init.php');

$sql = "INSERT INTO hupo_user VALUES(NULL,'$uname','$upwd','$tel');";
$result = mysqli_query($conn,$sql);
//DML: false 或 true
$output = [];  //将要输出给客户端的数据
if($result===false){
    //echo '{"code":2, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['msg'] = 'insert err';
}else {
    //echo '{"code":1, "msg":"insert succ","userId":'.mysqli_insert_id($conn).'}';
    $output['msg'] = 'insert succ';
    //$output['userId'] = mysqli_insert_id($conn);
}
echo json_encode($output);

