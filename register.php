<?php

require_once "database.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $fullName = trim($_POST["full_name"]);
    $studentId = trim($_POST["student_id"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Check required fields
    if (empty($fullName) || empty($studentId) || empty($email) || empty($password)) {
        die("Please fill in all fields.");
    }

    // Check name length
    if (strlen($fullName) > 100) {
        die("Name is too long.");
    }

    // Check email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Please enter a valid email address.");
    }

    // Check password length
    if (strlen($password) < 12) {
        die("Password must be at least 12 characters.");
    }

    // Check if student ID or email already exists
    $sql = "SELECT student_id
            FROM sign_up
            WHERE student_id = ? OR email = ?";

    $stmt = $club->prepare($sql);
    $stmt->execute([$studentId, $email]);

    if ($stmt->fetch()) {
        die("Student ID or email is already registered.");
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Register student
    $sql = "INSERT INTO sign_up (student_id, name, email, password)
            VALUES (?, ?, ?, ?)";

    $stmt = $club->prepare($sql);

    $stmt->execute([
        $studentId,
        $fullName,
        $email,
        $hashedPassword
    ]);

    header("Location: announcements.html?registered=success");
    exit;
}

?>