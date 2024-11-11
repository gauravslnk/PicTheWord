document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) => {
        const createRoom = document.getElementById("createRoom").checked;
        const joinRoom = document.getElementById("joinRoom").checked;
        
        if (!createRoom && !joinRoom) {
            event.preventDefault();
            alert("Please select an option to create or join a room.");
        }
    });
});
