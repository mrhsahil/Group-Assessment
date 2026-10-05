<?php

session_start();
require_once "database.php";

// Only admin can access member information
if (!isset($_SESSION["role_id"]) || $_SESSION["role_id"] != 1) {
    http_response_code(403);
    die("Access denied.");
}

// Get all student members
$sql = "SELECT student_id, name, email
        FROM sign_up
        WHERE roles = 2";

$stmt = $club->prepare($sql);
$stmt->execute();

$members = $stmt->fetchAll(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($members);

?>