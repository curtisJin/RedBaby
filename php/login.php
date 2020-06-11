<?php
include "conn.php";

if (isset($_POST['user']) && isset($_POST['password'])) {
    $user = $_POST['user'];
    $pass = $_POST['password'];
    $result = $conn->query("SELECT * FROM registry1903 where username='$user' AND userpass='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}