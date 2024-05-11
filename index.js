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

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.fillStyle = `white`;
    c.fill();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Asteroid {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 50 * Math.random() + 10;
  }
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.closePath();
    c.strokeStyle = `white`;
    c.fillStyle = `blue`;
    c.fill();
    c.stroke();
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

const projectiles = [];
const asteroids = [];

window.setInterval(() => {
  asteroids.push(
    new Asteroid({
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 1,
        y: 0,
      },
    })
  );
}, 3000);

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y - projectile.radius > canvas.height ||
      projectile.position.y + projectile.radius < 0
    ) {
      projectiles.splice(i, 1);
    }
  }

  // this is the asteroids loop
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();
  }

  if (keys.w.pressed) {
    player.velocity.x = Math.cos(player.rotation) * 6;
    player.velocity.y = Math.sin(player.rotation) * 6;
  } else if (!keys.w.pressed) {
    player.velocity.x *= 0.97;
    player.velocity.y *= 0.97;
  }
  if (keys.d.pressed) player.rotation += 0.05;
  else if (keys.a.pressed) player.rotation -= 0.05;
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
    case `Space`:
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + Math.cos(player.rotation) * 50,
            y: player.position.y + Math.sin(player.rotation) * 50,
          },
          velocity: {
            x: Math.cos(player.rotation) * 5,
            y: Math.sin(player.rotation) * 5,
          },
        })
      );
      console.log(projectiles);
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
