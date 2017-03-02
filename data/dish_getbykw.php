<?php
 header("Content-type:application/json;charset=UTF-8");
@$key=$_REQUEST['key'];
if(empty($key)){
    echo '[]';
    return;
}
$output=[];
 $conn=mysqli_connect('127.0.0.1','root','','kaifanla',3306);
 $sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql = "SELECT did,price,name,img_sm,material FROM kf_dish WHERE name LIKE '%$key%' OR material LIKE '%$key%'";
$result=mysqli_query($conn,$sql);
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