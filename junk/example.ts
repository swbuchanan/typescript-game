class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d')!;
    this.player = new Player(this.canvas.width / 2, this.canvas.height - 50);

    window.addEventListener('keydown', this.handleInput.bind(this));
    console.log("tf");

    requestAnimationFrame(() => this.gameLoop());
  }

  private gameLoop(): void {
    // Update game state
    this.player.update();

    // Draw game objects
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);

    // Request next frame
    requestAnimationFrame(() => this.gameLoop());
  }

  private handleInput(event: KeyboardEvent): void {
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
  }
}

class Player {
  private x: number;
  private y: number;
  private speed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 5;
  }

  public update(): void {}

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x - 10, this.y - 10, 20, 20);
  }

  public moveLeft(): void {
    this.x -= this.speed;
  }

  public moveRight(): void {
    this.x += this.speed;
  }
}

new Game();

