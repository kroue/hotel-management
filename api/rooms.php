<?php
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json');

include 'db_connection.php';

$query = "SELECT id, name, description, price, picture_link FROM rooms";
$result = $conn->query($query);

$rooms = [];
while ($row = $result->fetch_assoc()) {
    $rooms[] = $row;
}

echo json_encode($rooms);
?>