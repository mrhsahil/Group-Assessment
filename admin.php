<?php

session_start();

if (!isset($_SESSION["student_id"]) || $_SESSION["role_id"] != 1) {
    header("Location: login.html");
    exit;
}

header("Location: admin.html");
exit;

?>