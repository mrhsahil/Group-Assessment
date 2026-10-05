<?php

session_start();

require_once "database.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($email) || empty($password)) {
        die("Please fill in all fields.");
    }

    $sql = "SELECT * FROM sign_up WHERE email = ?";

    $stmt = $club->prepare($sql);
    $stmt->execute([$email]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {

        $_SESSION["student_id"] = $user["student_id"];
        $_SESSION["name"] = $user["name"];
        $_SESSION["email"] = $user["email"];
        $_SESSION["role_id"] = $user["roles"];

        if ($user["roles"] == 1) {
    header("Location: admin.php");
    exit;

    } else {
            header("Location: announcements.html");
            exit;
            }
    } else {
        die("Invalid email or password.");
    }
}

?>