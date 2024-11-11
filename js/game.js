let roomCode = new URLSearchParams(window.location.search).get('room_code');
let inGameName = sessionStorage.getItem('in_game_name'); // Get in-game name from sessionStorage
let socket;
let currentRound = 1;
let totalRounds = 0; // Define total rounds based on the player count from server
let words = [];
let timeLeft = 10;

window.onload = function() {
    document.getElementById("room-code").textContent = roomCode;
    document.getElementById("round").textContent = currentRound;

    // Initialize WebSocket connection
    socket = new WebSocket('ws://localhost:8080'); // Adjust URL if hosted differently

    socket.onopen = function() {
        console.log("Connected to WebSocket server.");
        socket.send(JSON.stringify({ type: 'join', room_code: roomCode, player_name: inGameName }));
    };

    socket.onmessage = function(event) {
        let message = JSON.parse(event.data);
        
        // Handle message based on type
        if (message.type === 'word_options') {
            displayWordOptions(message.words);
        }
        if (message.type === 'start_round') {
            startRound(message.words);
        }
        if (message.type === 'end_round') {
            endRound();
        }
        if (message.type === 'game_over') {
            endGame(message.finalScores); // Final scores sent from server
        }
    };

    // Handle word guess submission
    document.getElementById('submit-guess').addEventListener('click', function() {
        let guess = document.getElementById('chat-input').value.trim();
        if (guess) {
            socket.send(JSON.stringify({ type: 'guess', room_code: roomCode, guess: guess }));
            document.getElementById('chat-input').value = ''; // Clear input after submitting
        }
    });

    startTimer();
};

// Display the word options for the player
function displayWordOptions(wordList) {
    let wordListContainer = document.getElementById('word-list');
    wordListContainer.innerHTML = ''; // Clear previous words if any

    wordList.forEach(word => {
        let li = document.createElement('li');
        li.textContent = word;
        li.onclick = function() {
            socket.send(JSON.stringify({ type: 'select_word', room_code: roomCode, word: word }));
            document.getElementById("word-options").style.display = 'none'; // Hide options after selection
        };
        wordListContainer.appendChild(li);
    });

    document.getElementById("word-options").style.display = 'block';
}

// Start the round and display the canvas
function startRound(newWords) {
    words = newWords; // Set words for the round
    document.getElementById("chat-box").style.display = 'block';
    document.getElementById("game-canvas-container").style.display = 'block';
    timeLeft = 10; // Reset the timer for each round
    document.getElementById('timer').textContent = timeLeft;
    startTimer();
}

// Timer countdown for drawing/guessing
function startTimer() {
    let timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            socket.send(JSON.stringify({ type: 'end_round', room_code: roomCode }));
        } else {
            document.getElementById('timer').textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

// End the round and prepare for the next
function endRound() {
    setTimeout(function() {
        currentRound++;
        document.getElementById("round").textContent = currentRound;
        if (currentRound > totalRounds) {
            // Game over, send final message
            socket.send(JSON.stringify({ type: 'game_over', room_code: roomCode }));
        } else {
            socket.send(JSON.stringify({ type: 'next_round', room_code: roomCode }));
        }
    }, 2000);
}

// Display game over screen
function endGame(finalScores) {
    alert("Game Over! Scores: " + JSON.stringify(finalScores)); // Display final scores
    // Implement UI to show scores in a styled way if needed
}
