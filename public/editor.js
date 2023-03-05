var tileSize = 20;
// Set up a default empty grid
var emptyGrid = [
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
    '.....................................................................',
];
// turn the grid into an actual 2d array
var defaultGrid = [];
for (var _i = 0, emptyGrid_1 = emptyGrid; _i < emptyGrid_1.length; _i++) {
    var str = emptyGrid_1[_i];
    defaultGrid.push(str.split(''));
}
var Editor = /** @class */ (function () {
    function Editor(grid) {
        if (grid === void 0) { grid = defaultGrid; }
        this.grid = grid;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        window.addEventListener('click', this.handleMouseInput.bind(this));
    }
    Editor.prototype.handleMouseInput = function (event) {
        var rect = this.canvas.getBoundingClientRect();
        var x = event.x - rect.left;
        var y = event.y - rect.top;
        var gridX = Math.floor(x / tileSize);
        var gridY = Math.floor(y / tileSize);
        console.log("(".concat(x, ", ").concat(y, ") -> (").concat(gridX, ",").concat(gridY, ")"));
        if (this.grid[gridY][gridX] === '.') {
            this.grid[gridY][gridX] = '#';
        }
        else if (this.grid[gridY][gridX] === '#') {
            this.grid[gridY][gridX] = '.';
        }
        this.printGrid();
    };
    Editor.prototype.printGrid = function () {
        var rowStrings = this.grid.map(function (row) { return row.join(''); });
        console.log(rowStrings.join('\n'));
    };
    Editor.prototype.drawLoop = function () {
        var _this = this;
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var y = 0; y < this.grid.length; y++) {
            for (var x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === '#') {
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
                this.ctx.strokeStyle = 'gray';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
        requestAnimationFrame(function () { return _this.drawLoop(); });
    };
    return Editor;
}());
var editor = new Editor();
editor.drawLoop();
