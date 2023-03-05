const tileSize = 20;

// Set up a default empty grid
const emptyGrid = [
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
const defaultGrid = [];
for (const str of emptyGrid) {
  defaultGrid.push(str.split(''));
}

class Editor {
    private grid: string[][];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(grid: string[][] = defaultGrid) {
        this.grid = grid;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);

        window.addEventListener('click', this.handleMouseInput.bind(this));
    }

    private handleMouseInput(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.x - rect.left;
        const y = event.y - rect.top;
        const gridX = Math.floor(x / tileSize);
        const gridY = Math.floor(y / tileSize);
        console.log(`(${x}, ${y}) -> (${gridX},${gridY})`);

        if (this.grid[gridY][gridX] === '.') {
            this.grid[gridY][gridX] = '#';
        } else if (this.grid[gridY][gridX] === '#') {
            this.grid[gridY][gridX] = '.';
        }
        this.printGrid();
    }
    public printGrid(): void {
        const rowStrings = this.grid.map(row => row.join(''));
        console.log(rowStrings.join('\n'));
      }
    public drawLoop(): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < this.grid.length; y ++) {
            for (let x = 0; x < this.grid[y].length; x ++) {
                if (this.grid[y][x] === '#') {
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
                }
                this.ctx.strokeStyle = 'gray';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(x*tileSize, y*tileSize, tileSize, tileSize);
            }
        }
        requestAnimationFrame(() => this.drawLoop());
    }
}



const editor = new Editor();

editor.drawLoop();