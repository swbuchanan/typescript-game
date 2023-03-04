// Define the canvas and get context
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");
const tileWidth = 32;

type positionTuple = { x: number, y: number };

class drawnObject {
  x: number;
  y: number;
  gridx: number;
  gridy: number;
  width: number;
  height: number;

  constructor(gridx: number, gridy: number, width: number, height: number) {
    this.gridx = gridx;
    this.gridy = gridy;
    this.x = gridx*tileWidth;
    this.y = gridy*tileWidth;
    this.width = width;
    this.height = height;
  }
}

let player = new drawnObject(
  1,
  1,
  tileWidth,
  tileWidth
)

class Game {
  private grid: string[][];
  private playerPosition: positionTuple;
  private obstacles: drawnObject[];

  constructor(grid: string[][]) {
    this.grid = grid;
    this.playerPosition = this.findPlayerPosition();
  }

  private findObstacles() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '#') {
          this.obstacles.push(new drawnObject(x, y, tileWidth, tileWidth));
        }
      }
    }
  }


  private findPlayerPosition(): positionTuple {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '@') {
          return { x, y };
        }
      }
    }
    throw new Error("Player not found in grid.");
  }

  public movePlayer(dx: number, dy: number): void {
    const newPosition = { x: this.playerPosition.x + dx, y: this.playerPosition.y + dy };
    if (this.isOutOfBounds(newPosition) || this.isWall(newPosition)) {
      return;
    }
    this.grid[this.playerPosition.y][this.playerPosition.x] = ' ';
    this.grid[newPosition.y][newPosition.x] = '@';
    this.playerPosition = newPosition;
  }

  private isOutOfBounds(position: positionTuple): boolean {
    return position.x < 0 || position.x >= this.grid[0].length || position.y < 0 || position.y >= this.grid.length;
  }

  private isWall(position: positionTuple): boolean {
    return this.grid[position.y][position.x] === '#';
  }

  public printGrid(): void {
    for (let row of this.grid) {
      console.log(row.join(''));
    }
  }
}

function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// Example usage:
const grid = [
  ['#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', '#'],
  ['#', ' ', '@', ' ', '#'],
  ['#', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#'],
];

const game = new Game(grid);
game.printGrid(); // prints the initial grid

game.movePlayer(0, -1); // move up
game.movePlayer(1, 0);  // move right
game.movePlayer(0, 1);  // move down
game.movePlayer(-1, 0); // move left

game.printGrid(); // prints the updated grid
