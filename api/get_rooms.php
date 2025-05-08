<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

include 'db_connection.php';

// Query to fetch room data
$query = "SELECT name, description, price, picture_link FROM rooms";
$result = $conn->query($query);

$rooms = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row; // Add each room to the array
    }
}

// Return the room data as JSON
echo json_encode($rooms);
?>