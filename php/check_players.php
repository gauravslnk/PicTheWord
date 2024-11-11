<?php
include('config.php');

$room_code = $_GET['room_code'] ?? '';

// Debugging: Output the room code being checked
echo "Checking Room Code: " . $room_code . "<br>";

if ($room_code) {
    // Fetch room details and check player count
    $query = "SELECT num_players, current_players FROM rooms WHERE room_code = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$room_code]);
    $room = $stmt->fetch();

    // Debugging: Output the room details
    if ($room) {
        echo "Room found: " . print_r($room, true) . "<br>";

        $allPlayersJoined = ($room['current_players'] >= $room['num_players']);
        echo "All players joined: " . ($allPlayersJoined ? "Yes" : "No") . "<br>";

        echo json_encode(['allPlayersJoined' => $allPlayersJoined]);
    } else {
        echo "Room not found.";
        echo json_encode(['allPlayersJoined' => false]);
    }
} else {
    echo "Room code is missing.";
    echo json_encode(['allPlayersJoined' => false]);
}
?>
