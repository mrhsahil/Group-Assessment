<?php

session_start();

// Check access to announcements
if (isset($_GET["page"]) && $_GET["page"] == "announcements") {

    if (!isset($_SESSION["student_id"])) {
        header("Location: login.html");
        exit;
    }

    header("Location: announcements.html");
    exit;
}

// Return login information
header("Content-Type: application/json");

if (isset($_SESSION["student_id"])) {
    echo json_encode([
        "loggedIn" => true,
        "role" => $_SESSION["role_id"]
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}

?>