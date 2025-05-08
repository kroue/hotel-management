<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$query = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$query->bind_param("sss", $username, $email, $password);

if ($query->execute()) {
    echo json_encode(['success' => true, 'message' => 'User registered successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed.']);
}
?>