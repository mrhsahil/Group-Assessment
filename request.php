<?php

session_start();
require_once "database.php";

// Student must be logged in
if (!isset($_SESSION["student_id"])) {
    http_response_code(401);
    die("Please log in first.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $studentId = $_SESSION["student_id"];

    $title = trim($_POST["title"]);
    $category = trim($_POST["category"]);
    $des = trim($_POST["des"]);

    if (empty($title) || empty($category) || empty($des)) {
        die("Please fill in all fields.");
    }

    $sql = "INSERT INTO announcement_requests
            (student_id, title, category, des, status)
            VALUES (?, ?, ?, ?, 'Pending')";

    $stmt = $club->prepare($sql);

    $stmt->execute([
        $studentId,
        $title,
        $category,
        $des
    ]);

    header("Location: announcements.html?request=success");
    exit;
}

?>