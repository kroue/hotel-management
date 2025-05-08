<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$room_id = $data['room_id'];
$room_name = $data['room_name'];
$check_in = $data['check_in'];
$check_out = $data['check_out'];
$adult_count = $data['adult_count'];
$child_count = $data['child_count'];
$first_name = $data['first_name'];
$last_name = $data['last_name'];
$email_address = $data['email_address'];
$contact_number = $data['contact_number'];
$estimated_arrival_time = $data['estimated_arrival_time'];
$total_price = $data['total_price'];
$guest_name = $first_name . ' ' . $last_name;

$query = $conn->prepare("INSERT INTO bookings (room_id, room_name, check_in, check_out, adult_count, child_count, first_name, last_name, email_address, contact_number, estimated_arrival_time, total_price, guest_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$query->bind_param("issssissssds", $room_id, $room_name, $check_in, $check_out, $adult_count, $child_count, $first_name, $last_name, $email_address, $contact_number, $estimated_arrival_time, $total_price, $guest_name);

if ($query->execute()) {
    echo json_encode(['success' => true, 'message' => 'Booking successful.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Booking failed.']);
}
?>