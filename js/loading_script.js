document.addEventListener("DOMContentLoaded", function () {
    const roomCode = sessionStorage.getItem("room_code");

    function checkPlayers() {
        fetch(`php/check_players.php?room_code=${roomCode}`)
            .then(response => response.json())
            .then(data => {
                if (data.allPlayersJoined) {
                    window.location.href = "game.html";
                }
            })
            .catch(error => console.error("Error checking player status:", error));
    }

    // Poll every 3 seconds
    setInterval(checkPlayers, 3000);
});
