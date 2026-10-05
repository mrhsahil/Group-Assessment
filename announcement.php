<?php

session_start();
require_once "database.php";

// Get announcements
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $sql = "SELECT a_id, title, time, des, category FROM announcement";

    $stmt = $club->prepare($sql);
    $stmt->execute();

    $announcements = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode($announcements);
}


// Add announcement
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Only admin can add announcements
    if (!isset($_SESSION["role_id"]) || $_SESSION["role_id"] != 1) {
        http_response_code(403);
        die("Access denied.");
    }

    $title = trim($_POST["title"]);
    $category = $_POST["category"];
    $des = trim($_POST["des"]);

    // Automatically create the current date and time
    $time = date("Y-m-d H:i:s");

    $sql = "INSERT INTO announcement (title, time, des, category)
            VALUES (?, ?, ?, ?)";

    $stmt = $club->prepare($sql);

    $stmt->execute([
        $title,
        $time,
        $des,
        $category
    ]);

    header("Location: admin.html?announcement=success");
    exit;
}

// Update announcement
if ($_SERVER["REQUEST_METHOD"] == "PUT") {

    // Only admin can update announcements
    if (!isset($_SESSION["role_id"]) || $_SESSION["role_id"] != 1) {
        http_response_code(403);
        die("Access denied.");
    }

    $a_id = $_GET["id"];

    // Get the data sent from admin.js
    parse_str(file_get_contents("php://input"), $data);

    $title = trim($data["title"]);
    $category = $data["category"];
    $des = trim($data["des"]);

    $sql = "UPDATE announcement
            SET title = ?, category = ?, des = ?
            WHERE a_id = ?";

    $stmt = $club->prepare($sql);

    $stmt->execute([
        $title,
        $category,
        $des,
        $a_id
    ]);

    echo "Announcement updated.";
}

// Delete announcement
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

    // Only admin can delete announcements
    if (!isset($_SESSION["role_id"]) || $_SESSION["role_id"] != 1) {
        http_response_code(403);
        die("Access denied.");
    }

    $a_id = $_GET["id"];

    $sql = "DELETE FROM announcement WHERE a_id = ?";

    $stmt = $club->prepare($sql);
    $stmt->execute([$a_id]);

    echo "Announcement deleted.";
}

?>