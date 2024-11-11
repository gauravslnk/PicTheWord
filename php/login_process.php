<?php
session_start();
include('config.php');

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];

    // Store the in-game name in the session
    $_SESSION['in_game_name'] = $username;

    // Redirect to the next page based on the room option (create or join)
    if (isset($_POST['room_option']) && $_POST['room_option'] === 'create') {
        header("Location: ../create.html");
    } elseif (isset($_POST['room_option']) && $_POST['room_option'] === 'join') {
        header("Location: ../join.html");
    }
    exit();
}
?>
