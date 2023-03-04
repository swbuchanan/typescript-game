"use strict";
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 480;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 50);
        window.addEventListener('keydown', this.handleInput.bind(this));
        console.log("tf");
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        // Update game state
        this.player.update();
        // Draw game objects
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        // Request next frame
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.handleInput = function (event) {
        console.log('hu');
        switch (event.key) {
            case 'ArrowLeft':
                // Move player left
                this.player.moveLeft();
                break;
            case 'ArrowRight':
                // Move player right
                this.player.moveRight();
                break;
            default:
                // Ignore other input events
                break;
        }
    };
    return Game;
}());
var Player = /** @class */ (function () {
    function Player(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
    }
    Player.prototype.update = function () { };
    Player.prototype.draw = function (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
    };
    Player.prototype.moveLeft = function () {
        this.x -= this.speed;
    };
    Player.prototype.moveRight = function () {
        this.x += this.speed;
    };
    return Player;
}());
new Game();
