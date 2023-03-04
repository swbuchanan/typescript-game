// Define the canvas and get context
var canvas = document.getElementById("game-canvas");
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext("2d");
var tileWidth = 32;
var drawnObject = /** @class */ (function () {
    function drawnObject(gridx, gridy, width, height) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.x = gridx * tileWidth;
        this.y = gridy * tileWidth;
        this.width = width;
        this.height = height;
    }
    return drawnObject;
}());
var player = new drawnObject(50, 50, tileWidth, tileWidth);
var Game = /** @class */ (function () {
    function Game(grid) {
        this.grid = grid;
        this.playerPosition = this.findPlayerPosition();
    }
    Game.prototype.findObstacles = function () {
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === '#') {
                    this.obstacles.push(new drawnObject(x, y, tileWidth, tileWidth));
                }
            }
        }
    };
    Game.prototype.findPlayerPosition = function () {
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === '@') {
                    return { x: x, y: y };
                }
            }
        }
        throw new Error("Player not found in grid.");
    };
    Game.prototype.movePlayer = function (dx, dy) {
        var newPosition = { x: this.playerPosition.x + dx, y: this.playerPosition.y + dy };
        if (this.isOutOfBounds(newPosition) || this.isWall(newPosition)) {
            return;
        }
        this.grid[this.playerPosition.y][this.playerPosition.x] = ' ';
        this.grid[newPosition.y][newPosition.x] = '@';
        this.playerPosition = newPosition;
    };
    Game.prototype.isOutOfBounds = function (position) {
        return position.x < 0 || position.x >= this.grid[0].length || position.y < 0 || position.y >= this.grid.length;
    };
    Game.prototype.isWall = function (position) {
        return this.grid[position.y][position.x] === '#';
    };
    Game.prototype.printGrid = function () {
        for (var _i = 0, _a = this.grid; _i < _a.length; _i++) {
            var row = _a[_i];
            console.log(row.join(''));
        }
    };
    return Game;
}());
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the player
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}
// Example usage:
var grid = [
    ['#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', '#'],
    ['#', ' ', '@', ' ', '#'],
    ['#', ' ', ' ', ' ', '#'],
    ['#', '#', '#', '#', '#'],
];
var game = new Game(grid);
game.printGrid(); // prints the initial grid
game.movePlayer(0, -1); // move up
game.movePlayer(1, 0); // move right
game.movePlayer(0, 1); // move down
game.movePlayer(-1, 0); // move left
game.printGrid(); // prints the updated grid
