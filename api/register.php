<?php
header('Access-Control-Allow-Origin: http://localhost:3001'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$query = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$query->bind_param("sss", $username, $email, $password);

if ($query->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}
?>