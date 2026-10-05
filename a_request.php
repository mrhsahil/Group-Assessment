<?php

session_start();
require_once "database.php";

// Only admin can access requests
if (!isset($_SESSION["role_id"]) || $_SESSION["role_id"] != 1) {
    http_response_code(403);
    die("Access denied.");
}

// Load pending requests
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $sql = "SELECT r_id, student_id, title, category, des, status, r_date
            FROM announcement_requests
            WHERE status = 'Pending'
            ORDER BY r_date DESC";

    $stmt = $club->prepare($sql);
    $stmt->execute();

    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header("Content-Type: application/json");
    echo json_encode($requests);
    exit;
}

// Approve or reject request
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $requestId = $_POST["r_id"] ?? "";
    $action = $_POST["action"] ?? "";

    if (empty($requestId)) {
        http_response_code(400);
        die("Request ID is required.");
    }

    // Approve request
    if ($action == "approve") {

        $sql = "SELECT title, category, des
                FROM announcement_requests
                WHERE r_id = ? AND status = 'Pending'";

        $stmt = $club->prepare($sql);
        $stmt->execute([$requestId]);

        $request = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$request) {
            http_response_code(404);
            die("Pending request not found.");
        }

        // Publish announcement
        $sql = "INSERT INTO announcement
                (title, category, time, des)
                VALUES (?, ?, ?, ?)";

        $stmt = $club->prepare($sql);

        $stmt->execute([
            $request["title"],
            $request["category"],
            date("Y-m-d"),
            $request["des"]
        ]);

        // Change status to Approved
        $sql = "UPDATE announcement_requests
                SET status = 'Approved'
                WHERE r_id = ?";

        $stmt = $club->prepare($sql);
        $stmt->execute([$requestId]);

        echo "Request approved.";
        exit;
    }

    // Reject request
    if ($action == "reject") {

        $sql = "UPDATE announcement_requests
                SET status = 'Rejected'
                WHERE r_id = ? AND status = 'Pending'";

        $stmt = $club->prepare($sql);
        $stmt->execute([$requestId]);

        if ($stmt->rowCount() == 0) {
            http_response_code(404);
            die("Pending request not found.");
        }

        echo "Request rejected.";
        exit;
    }

    http_response_code(400);
    die("Invalid action.");
}

?>