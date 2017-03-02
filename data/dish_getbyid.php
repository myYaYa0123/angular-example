<?php
 header('Content-type:application/json;charset=UTF-8');
@$did = $_REQUEST['did'];
if(empty($did)){
    echo '[]';
    return;
}
 $conn=mysqli_connect('127.0.0.1','root','','kaifanla',3306);
 $sql='SET NAMES UTF8';
mysqli_query($conn,$sql);
$sql = "SELECT did,name,price,img_lg,material,detail FROM kf_dish WHERE did=$did";
$result = mysqli_query($conn,$sql);
$output=[];
$row = mysqli_fetch_assoc($result);
if(($row)!==null){
    $output[]=$row;
}
echo json_encode($output);
?>