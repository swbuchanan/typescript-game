const gameWidth = 512;
const gameHeight = 512;
const tileWidth = 32;
const tileHeight = 32;

type positionTuple = { x: number, y: number };

class drawnObject {
  x: number;
  y: number;
  gridx: number;
  gridy: number;
  width: number;
  height: number;
  color: string;
  pushable: boolean;

  constructor(gridx: number, gridy: number, width: number, height: number, color: string, pushable: boolean) {
    this.gridx = gridx;
    this.gridy = gridy;
    this.x = gridx*tileWidth;
    this.y = gridy*tileWidth;
    this.width = width;
    this.height = height;
    this.color = color;
    this.pushable = pushable;
  }

  public newGridPos(newx: number, newy: number): void {
    this.gridx = newx;
    this.gridy = newy;
    this.x = newx*tileWidth;
    this.y = newy*tileWidth;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}


class Game {
  private grid: string[][];
  private playerPosition: positionTuple;
  private obstacles: drawnObject[];
  private player: drawnObject;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(grid: string[][]) {
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
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = gameWidth;
    this.canvas.height = gameHeight;
    document.body.appendChild(this.canvas);

    // Add event listener for player input
    window.addEventListener('keydown', this.handleInput.bind(this));
  }

  private handleInput(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.movePlayer(-1,0);
        break;

      case 'ArrowRight':
        this.movePlayer(1,0)
        break;

      case 'ArrowUp':
        this.movePlayer(0,-1);
        break;

      case 'ArrowDown':
        this.movePlayer(0,1);
        break;

      default:
        break;
    }
  }

  private findObstacles(): void {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '#') {
          this.obstacles.push(new drawnObject(x, y, tileWidth, tileHeight, 'gray', false));
        }
        if (this.grid[y][x] === 'B') {
          this.obstacles.push(new drawnObject(x, y, tileWidth, tileHeight, 'brown', true));
        }
      }
    }
  }

  private getObstacleAtPosition(x: number, y: number): drawnObject {
    for (let obstacle of this.obstacles) {
      if (obstacle.gridx === x && obstacle.gridy === y) {
        return obstacle;
      }
    }
    return null;
  }

  private findPlayerPosition(): positionTuple {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '@') {
          console.log("hi");
          return { x, y };
        }
      }
    }
    throw new Error("Player not found in grid.");
  }

  public pushObject(thing: drawnObject, dx: number, dy: number): boolean {
    const newPosition = { x: thing.gridx + dx, y: thing.gridy + dy };

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

  }

  public movePlayer(dx: number, dy: number): void {
    const newPosition = { x: this.player.gridx + dx, y: this.player.gridy + dy };

    // Can't move through walls or out of bounds
    if (this.isOutOfBounds(newPosition) || this.isWall(newPosition)) {
      return;
    }



    // Check if we are moving into an object
    let obstacle = this.getObstacleAtPosition(newPosition.x, newPosition.y);
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

  public gameLoop(): void {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the player
    this.player.draw(this.ctx);

    // Draw the obstacles
    for (let obstacle of this.obstacles) {
      obstacle.draw(this.ctx);
    }

    // Request the next animation frame
    requestAnimationFrame(() => this.gameLoop());
  }

}


// Example usage:
const grid = [
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

const game = new Game(grid);
game.printGrid(); // prints the initial grid


game.gameLoop();
