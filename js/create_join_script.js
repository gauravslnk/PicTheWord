// Generate a random 6-character room code and display it
function generateRoomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roomCode = "";
    for (let i = 0; i < 6; i++) {
        roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Display the room code to the user (optional, for UI feedback)
    document.getElementById('roomCodeDisplay').innerText = roomCode;

    // Store the room code in the hidden input field for form submission
    document.getElementById('room_code').value = roomCode;
}

// Call the function to generate and display the room code when the page loads
window.onload = function() {
    generateRoomCode();
};
