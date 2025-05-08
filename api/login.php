<?php
header('Access-Control-Allow-Origin: http://localhost:3001'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
session_start(); // Start the session
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$query = $conn->prepare("SELECT * FROM users WHERE email = ?");
$query->bind_param("s", $email);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['username'] = $user['username']; // Store username in session
    echo json_encode(['success' => true, 'username' => $user['username']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>