// Define the canvas and context
var canvas = document.getElementById("game-canvas");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var ctx = canvas.getContext("2d");
// Define the player object
var player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    speed: 5
};
// Define the game loop function
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the player
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Move the player based on keyboard input
    if (keys.up) {
        player.y -= player.speed;
    }
    if (keys.down) {
        player.y += player.speed;
    }
    if (keys.left) {
        player.x -= player.speed;
    }
    if (keys.right) {
        player.x += player.speed;
    }
    if (player.x > canvas.width) {
        player.x = 0;
    }
    if (player.y > canvas.height) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = canvas.width;
    }
    if (player.y < 0) {
        player.y = canvas.height;
    }
    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}
// Define the keyboard input handling
var keys = {
    up: false,
    down: false,
    left: false,
    right: false
};
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowUp") {
        keys.up = true;
    }
    if (event.code === "ArrowDown") {
        keys.down = true;
    }
    if (event.code === "ArrowLeft") {
        keys.left = true;
    }
    if (event.code === "ArrowRight") {
        keys.right = true;
    }
});
document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowUp") {
        keys.up = false;
    }
    if (event.code === "ArrowDown") {
        keys.down = false;
    }
    if (event.code === "ArrowLeft") {
        keys.left = false;
    }
    if (event.code === "ArrowRight") {
        keys.right = false;
    }
});
// Start the game loop
gameLoop();
