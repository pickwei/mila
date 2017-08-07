<?php
header('Content-Type: application/json;charset=UTF-8');

@$pageNum = $_REQUEST['pageNum'];
if(empty($pageNum))
{
    $pageNum = 0;
}
$count = 5;

require('0_init.php');

$sql = "SELECT * FROM hupo_cases LIMIT $pageNum,$count";
$result = mysqli_query($conn,$sql);

$output = [];
while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);

?>