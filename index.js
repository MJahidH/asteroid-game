const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creates a black rectangle that fills the whole canvas

class Player {
  constructor({ position, velocity, color, radius }) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = 0;
  }

  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation);
    c.translate(-this.position.x, -this.position.y);
    c.beginPath();
    c.moveTo(this.position.x + 50, this.position.y);
    c.lineTo(this.position.x - 10, this.position.y - 20);
    c.lineTo(this.position.x - 10, this.position.y + 20);
    c.closePath();

    c.strokeStyle = `yellow`;
    c.fillStyle = `yellow`;
    c.stroke();
    c.fill();
    c.restore();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  player.velocity.x = 0;
  if (keys.w.pressed) player.velocity.x = 1;
  if (keys.d.pressed) player.rotation += 0.04;
}

animate();

window.addEventListener(`keydown`, (event) => {
  switch (event.code) {
    case `KeyW`:
      keys.w.pressed = true;
      break;
    case `KeyA`:
      keys.a.pressed = true;
      break;
    case `KeyD`:
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener(`keyup`, (event) => {
  switch (event.code) {
    case `KeyW`:
      keys.w.pressed = false;
      break;
    case `KeyA`:
      keys.a.pressed = false;
      break;
    case `KeyD`:
      keys.d.pressed = false;
      break;
  }
});
