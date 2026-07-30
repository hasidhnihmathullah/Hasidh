<?php
// Database configuration
$host = "localhost";
$user = "root";
$pass = "";
$db   = "velvet_web"; 
$port = 3306;            

// Create connection
$conn = mysqli_connect($host, $user, $pass, $db, $port);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>