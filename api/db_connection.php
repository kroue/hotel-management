<?php
$servername = "localhost"; // MySQL server (default: localhost)
$username = "root";        // MySQL username (default: root for XAMPP)
$password = "";            // MySQL password (default: empty for XAMPP)
$dbname = "hotel_management"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>