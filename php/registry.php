<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("SELECT * from registry1903 where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
//$_POST里面的内容是form表单中input的name名，form的action要配置为当前PHP地址
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
    $phone = $_POST['phone'];
    $conn->query("INSERT registry1903 values(null,'$username','$password','$phone',NOW())");
    header('location:http://localhost:8080/RedBaby/src/login.html');
}
