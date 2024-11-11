<?php
session_start();
include('config.php');  // Database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle logic for starting a game, creating a session, etc.
    $in_game_name = $_POST['in_game_name']; 
    $room_code = $_POST['room_code'];
    
    // Insert into database and return room code
    // Insert the room into the database with the game data
    $stmt = $pdo->prepare("INSERT INTO rooms (room_code, num_players, creator_username, current_players) VALUES (?, ?, ?, 1)");
    $stmt->execute([$room_code, $_POST['num_players'], $in_game_name]);

    // Send back the room code and redirect to the game
    header("Location: ../game.html?room_code=$room_code");
    exit();
}
?>
