<?php
session_start();
include('config.php'); // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the in-game name and number of players from the form
    $in_game_name = $_POST['in_game_name']; // Capture the in-game name
    $num_players = $_POST['num_players'];

    // Store the in-game name in the session
    $_SESSION['in_game_name'] = $in_game_name;

    // Generate a random 6-character room code
    $room_code = $_POST['room_code'];

    // Debugging: Output the generated room code and in-game name
    echo "Generated Room Code: " . $room_code . "<br>";
    echo "In-game Name: " . $in_game_name . "<br>";

    // Insert the new room into the database with current_players = 1
    try {
        $stmt = $pdo->prepare("INSERT INTO rooms (room_code, num_players, creator_username, current_players) VALUES (?, ?, ?, ?)");
        $stmt->execute([$room_code, $num_players, $in_game_name, 1]); // Insert the room data
    } catch (PDOException $e) {
        echo "Error inserting room: " . $e->getMessage();
        exit();
    }

    // Save room code in the session for further use
    $_SESSION['room_code'] = $room_code;

    // Redirect to loading page
    header("Location: ../loading.html?room_code=$room_code");
    exit();
}
?>
