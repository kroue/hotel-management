<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001'); // Adjust to match your frontend URL
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract booking details
    $room_id = $data['room_id'];
    $room_name = $data['room_name'];
    $check_in = $data['check_in'];
    $check_out = $data['check_out'];
    $adult_count = $data['adult_count'];
    $child_count = $data['child_count'];
    $last_name = $data['last_name'];
    $first_name = $data['first_name'];
    $contact_number = $data['contact_number'];
    $email_address = $data['email_address'];
    $estimated_arrival_time = $data['estimated_arrival_time'];
    $total_price = $data['total_price'];
    $guest_name = $data['guest_name'];

    // Insert booking into the database
    $query = $conn->prepare("INSERT INTO bookings (room_id, room_name, check_in, check_out, adult_count, child_count, last_name, first_name, contact_number, email_address, estimated_arrival_time, total_price, guest_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("isssiisssssss", $room_id, $room_name, $check_in, $check_out, $adult_count, $child_count, $last_name, $first_name, $contact_number, $email_address, $estimated_arrival_time, $total_price, $guest_name);

    if ($query->execute()) {
        echo json_encode(['success' => true, 'message' => 'Booking successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save booking']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all bookings
    $query = "SELECT id, room_name, check_in, check_out, guest_name, total_price FROM bookings";
    $result = $conn->query($query);

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode($bookings);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>