var gameWidth = 512;
var gameHeight = 512;
var tileWidth = 32;
var tileHeight = 32;
var drawnObject = /** @class */ (function () {
    function drawnObject(gridx, gridy, width, height, color, pushable) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.x = gridx * tileWidth;
        this.y = gridy * tileWidth;
        this.width = width;
        this.height = height;
        this.color = color;
        this.pushable = pushable;
    }
    drawnObject.prototype.newGridPos = function (newx, newy) {
        this.gridx = newx;
        this.gridy = newy;
        this.x = newx * tileWidth;
        this.y = newy * tileWidth;
    };
    drawnObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    return drawnObject;
}());
var Game = /** @class */ (function () {
    function Game(grid) {
        this.grid = grid;
        //    this.playerPosition = this.findPlayerPosition();
        this.player = new drawnObject(this.findPlayerPosition().x, this.findPlayerPosition().y, tileWidth, tileWidth, 'green', false);
        console.log(this.player);
        this.obstacles = [];
        this.findObstacles();
        console.log(this.obstacles);
        // Get canvas element and context
        //    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
        document.body.appendChild(this.canvas);
        // Add event listener for player input
        window.addEventListener('keydown', this.handleInput.bind(this));
    }
    Game.prototype.handleInput = function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                this.movePlayer(1, 0);
                break;
            case 'ArrowUp':
                this.movePlayer(0, -1);
                break;
            case 'ArrowDown':
                this.movePlayer(0, 1);
                break;
            default:
                break;
        }
    };
    Game.prototype.findObstacles = function () {
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === '#') {
                    this.obstacles.push(new drawnObject(x, y, tileWidth, tileHeight, 'gray', false));
                }
                if (this.grid[y][x] === 'B') {
                    this.obstacles.push(new drawnObject(x, y, tileWidth, tileHeight, 'brown', true));
                }
            }
        }
    };
    Game.prototype.getObstacleAtPosition = function (x, y) {
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            if (obstacle.gridx === x && obstacle.gridy === y) {
                return obstacle;
            }
        }
        return null;
    };
    Game.prototype.findPlayerPosition = function () {
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === '@') {
                    console.log("hi");
                    return { x: x, y: y };
                }
            }
        }
        throw new Error("Player not found in grid.");
    };
    Game.prototype.pushObject = function (thing, dx, dy) {
        var newPosition = { x: thing.gridx + dx, y: thing.gridy + dy };
        // Can't move through walls or out of bounds
        if (this.isOutOfBounds(newPosition) || this.isWall(newPosition)) {
            return false;
        }
        // Can't push an object into another object
        if (this.getObstacleAtPosition(newPosition.x, newPosition.y) !== null) {
            return false;
        }
        // Update the grid
        this.grid[newPosition.y][newPosition.x] = this.grid[thing.gridy][thing.gridx];
        this.printGrid();
        // Move the thing
        thing.newGridPos(newPosition.x, newPosition.y);
        return true;
    };
    Game.prototype.movePlayer = function (dx, dy) {
        var newPosition = { x: this.player.gridx + dx, y: this.player.gridy + dy };
        // Can't move through walls or out of bounds
        if (this.isOutOfBounds(newPosition) || this.isWall(newPosition)) {
            return;
        }
        // Check if we are moving into an object
        var obstacle = this.getObstacleAtPosition(newPosition.x, newPosition.y);
        if (obstacle !== null) {
            // Try to push the object
            if (!this.pushObject(obstacle, dx, dy)) {
                return;
                //        this.grid[this.player.gridy][this.player.gridx] = ' ';
                //        this.grid[newPosition.y][newPosition.x] = '@';
            }
        }
        // Update the state array
        this.grid[this.player.gridy][this.player.gridx] = ' ';
        this.grid[newPosition.y][newPosition.x] = '@';
        // Update the player's position
        this.player.newGridPos(newPosition.x, newPosition.y);
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
    Game.prototype.gameLoop = function () {
        var _this = this;
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw the player
        this.player.draw(this.ctx);
        // Draw the obstacles
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            obstacle.draw(this.ctx);
        }
        // Request the next animation frame
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
// Example usage:
var grid = [
    ['#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', '@', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', '#', '#', ' ', ' ', '#'],
    ['#', ' ', ' ', '#', '#', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', 'B', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#'],
];
var game = new Game(grid);
game.printGrid(); // prints the initial grid
game.gameLoop();
