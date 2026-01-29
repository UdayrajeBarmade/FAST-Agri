<?php
$servername = "localhost";
$username = "root";   // your MySQL username
$password = "";       // your MySQL password
$dbname = "user_auth";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get values from POST
$email = $_POST['email'];
$password = $_POST['password'];

// Hash check (in real use, passwords are hashed using password_hash() and verified with password_verify())
$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    
    if (password_verify($password, $row['password_hash'])) {
        echo "success";
    } else {
        echo "invalid_password";
    }
} else {
    echo "invalid_user";
}

$conn->close();
?>
