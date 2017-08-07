<?php
header('Content-Type: application/json;charset=UTF-8');

require('0_init.php');

$sql = "SELECT * FROM hupo_product";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
if($row){
  $output = $row;
}

echo json_encode($output);