<?php

session_start();
require_once "database.php";

// User must be logged in
if (!isset($_SESSION["student_id"])) {
    http_response_code(401);
    die("Please log in first.");
}

$studentId = $_SESSION["student_id"];

$sql = "SELECT student_id, name, email
        FROM sign_up
        WHERE student_id = ?";

$stmt = $club->prepare($sql);
$stmt->execute([$studentId]);

$member = $stmt->fetch(PDO::FETCH_ASSOC);

header("Content-Type: application/json");
echo json_encode($member);

// Update membership details
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullName = trim($_POST["full_name"]);
    $email = trim($_POST["email"]);

    if (empty($fullName) || empty($email)) {
        http_response_code(400);
        die("Please fill in all fields.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        die("Please enter a valid email address.");
    }

    $sql = "UPDATE sign_up
            SET name = ?, email = ?
            WHERE student_id = ?";

    $stmt = $club->prepare($sql);

    $stmt->execute([
        $fullName,
        $email,
        $studentId
    ]);

    echo "Membership updated successfully.";
}

?>