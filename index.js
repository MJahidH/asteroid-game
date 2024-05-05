const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creates a black rectangle that fills the whole canvas
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

class Player {
  constructor({ position, velocity, color, radius }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    // c.fillStyle = `red`
    // c.fillRect(this.position.x,this.position.y,100,100)
    c.moveTo(this.position.x + 50, this.position.y);
    c.lineTo(this.position.x - 10, this.position.y - 20);
    c.lineTo(this.position.x - 10, this.position.y + 20);
    c.closePath();

    c.strokeStyle = `yellow`;
    c.stroke();
  }
}

const plaer = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

plaer.draw();
