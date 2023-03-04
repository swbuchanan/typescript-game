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
    speed: 1,
    accel: .01
};
var drawnObject = /** @class */ (function () {
    function drawnObject(x, y, width, height, speed, accel) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.accel = accel;
    }
    return drawnObject;
}());
var enemy = new drawnObject(canvas.width - 200, canvas.height - 200, 40, 40, 2, 0);
var objects = [enemy];
// Define the game loop function
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the player
    ctx.fillRect(player.x, player.y, player.width, player.height);
    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
        var obj = objects_1[_i];
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
    // Move the player based on keyboard input
    if (keys.up) {
        player.y -= player.speed;
        player.speed += player.accel;
    }
    if (keys.down) {
        player.y += player.speed;
        player.speed += player.accel;
    }
    if (keys.left) {
        player.x -= player.speed;
        player.speed += player.accel;
    }
    if (keys.right) {
        player.x += player.speed;
        player.speed += player.accel;
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
        player.speed = 1;
    }
    if (event.code === "ArrowDown") {
        keys.down = false;
        player.speed = 1;
    }
    if (event.code === "ArrowLeft") {
        keys.left = false;
        player.speed = 1;
    }
    if (event.code === "ArrowRight") {
        keys.right = false;
        player.speed = 1;
    }
});
// Start the game loop
gameLoop();
