<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$query = $conn->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s", $username);
$query->execute();
$result = $query->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    // Generate a token (for simplicity, using a random string here)
    $token = bin2hex(random_bytes(16));

    echo json_encode([
        'success' => true,
        'token' => $token,
        'message' => 'Login successful.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password.'
    ]);
}
?>