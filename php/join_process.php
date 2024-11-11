<?php
session_start();
include('config.php');

// Ensure the player has a valid in-game name from the form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $in_game_name = $_POST['in_game_name']; // Get in-game name from the form
    $_SESSION['in_game_name'] = $in_game_name; // Set in-game name in session

    $room_code = $_POST['room_code']; // Get the room code from the form

    echo "Room Code: " . $room_code . "<br>";  // Debugging: Check if the room code is received
    echo "In-game Name: " . $in_game_name . "<br>";  // Debugging: Check if the in-game name is received

    // Check if the room exists and has space for new players
    $query = "SELECT * FROM rooms WHERE room_code = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$room_code]);
    $room = $stmt->fetch();

    if ($room) {
        // Check if there is space in the room
        if ($room['current_players'] < $room['num_players']) {
            // Update the current player count if space is available
            $update = $pdo->prepare("UPDATE rooms SET current_players = current_players + 1 WHERE room_code = ?");
            $update->execute([$room_code]);

            // Save room code in the session for further use
            $_SESSION['room_code'] = $room_code;

            // Redirect to the loading page
            header("Location: ../loading.html?room_code=$room_code");
            exit();
        } else {
            echo "Room is full. Please try again later.";
            exit();
        }
    } else {
        echo "Room not found. Please check the code and try again.";
        exit();
    }
}
?>
