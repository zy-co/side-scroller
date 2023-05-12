const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let playerAttacking = false;
canvas.width = 1124;
canvas.height = 600;

class Character {
  constructor({position, velocity, imageSrc, framesMax, sprites}) {
    this.position = position;
    this.velocity = velocity;
    this.image = new Image();
    this.image.src = imageSrc;
    this.framesMax = framesMax;
    this.sprites = sprites;
    this.framesVal = 0;
    this.gameFrame = 0;
    this.staggerFrame = 8;
    this.scale = 2.5;
    this.width = 64;
    this.height = 80;
    this.gravity = 1;
    for (const sprite in this.sprites) {
        sprites[sprite].image = new Image();
        sprites[sprite].image.src = sprites[sprite].imageSrc;
      }
  }
  draw() {
    ctx.drawImage(this.image, this.framesVal * this.width, 0, this.width, this.height, this.position.x, this.position.y, this.width * this.scale, this.height * this.scale);
  }
  collisions() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.velocity.y + this.height <= canvas.height) this.velocity.y += this.gravity;
    else this.velocity.y = 0;
    
    if (this.position.y + this.height >= canvas.height) {
      gameOver = true;
    }
  }
  animation() {
    if (this.gameFrame % this.staggerFrame === 0) {
      this.framesVal < this.framesMax ? this.framesVal++: this.framesVal = 0;
    }
    this.gameFrame++;
  }
  switchSprite(sprite) {
    if (this.image === this.sprites.attack1.image
    && this.framesVal < this.sprites.attack1.framesMax) return;
    switch(sprite) {
      case 'idle':
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesVal = 0;
        }
        break;
      case 'idleLeft':
        if (this.image !== this.sprites.idleLeft.image) {
          this.image = this.sprites.idleLeft.image;
          this.framesMax = this.sprites.idleLeft.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'runRight':
        if (this.image !== this.sprites.runRight.image) {
          this.image = this.sprites.runRight.image;
          this.framesMax = this.sprites.runRight.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'runLeft':
        if (this.image !== this.sprites.runLeft.image) {
          this.image = this.sprites.runLeft.image;
          this.framesMax = this.sprites.runLeft.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'jump':
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'fall':
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'attack1':
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesVal = 0;
        }
        break;
        case 'hurt':
        if (this.image !== this.sprites.hurt.image) {
          this.image = this.sprites.hurt.image;
          this.framesMax = this.sprites.hurt.framesMax;
          this.framesVal = 0;
        }
        break;
    }
  }
  update() {
    this.draw();
    this.collisions();
    this.animation();
    controls();
  }
}

class Decorations {
  constructor({position, scalable, imageSrc}) {
    this.position = position;
    this.scalable = scalable;
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.scalable.width, this.scalable.height);
  }
  collisions() {
    botTerrains.forEach(botTerrain => {
      if (player.position.y + player.height <= botTerrain.position.y
      && player.position.y + player.velocity.y + player.height >= botTerrain.position.y
      && player.position.x + player.width >= botTerrain.position.x
      && player.position.x <= botTerrain.position.x + botTerrain.scalable.width) {
        player.velocity.y = 0;
      }
    });
  }
  update() {
    this.draw();
    this.collisions();
  }
}

class Enemy extends Character {
  constructor({position, imageSrc, framesMax, velocity, gravity}) {
    super({
      position,
      imageSrc,
      framesMax,
      velocity,
      gravity
    });
    this.width = 64;
    this.height = 80;
    this.framesVal = 0;
  }
  collisions() {
    botTerrains.forEach(botTerrain => {
      if (this.position.y + this.height <= botTerrain.position.y
      && this.position.y + this.velocity.y + this.height >= botTerrain.position.y
      && this.position.x + this.width >= botTerrain.position.x
      && this.position.x <= botTerrain.position.x + botTerrain.scalable.width) {
        this.velocity.y = 0;
      }
    });
    this.position.y += this.velocity.y;
    if (this.position.y + this.velocity.y + this.height <= canvas.height) this.velocity.y += this.gravity;
    else this.velocity.y = 0;
   
   enemys.forEach((enemy, i) => {
    if (player.position.y + player.height <= this.position.y
    && player.position.y + player.velocity.y + player.height >= this.position.y
    && player.position.x + player.width >= this.position.x
    && player.position.x <= this.position.x + this.width) {
      setTimeout(() => {
        enemys.splice(i, 1);
      }, 0);
    } else if (player.position.x + player.width <= this.position.x
    && player.position.x + player.velocity.x + player.width >= this.position.x
    && player.position.y + player.height >= this.position.y) {
      gameOver = true;
    }
   });
  }
  update() {
    this.draw();
    this.animation();
    this.collisions();
  }
}

const enemys = [new Enemy({
  imageSrc: './img/player/pirate-idle-left.png',
  framesMax: 4,
  position: {
    x: 500,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
}),
new Enemy({
  imageSrc: './img/player/pirate-idle-left.png',
  framesMax: 4,
  position: {
    x: 100,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  }
})];

function eachEnemy() {
  enemys.forEach(enemy => {
    enemy.update();
  });
}

const input = new InputHandler();

const background = new Decorations({
  position: {
    x: 0,
    y: 0
  },
  scalable: {
    width: 1124,
    height: 600
  },
  imageSrc: './img/sky.png'
});

function eachBotTerrain() {
  botTerrains.forEach(botTerrain => {
    botTerrain.update();
  });
}

const botTerrains = [new Decorations({
  position: {
    x: 0,
    y: canvas.height / 1.3
  },
  scalable: {
    width: 580,
    height: 192
  },
  imageSrc: './img/terrainLong.png'
}),
new Decorations({
  position: {
    x: 580,
    y: canvas.height / 1.3
  },
  scalable: {
    width: 580,
    height: 192
  },
  imageSrc: './img/terrainLong.png'
}),
new Decorations({
  position: {
    x: 1300,
    y: canvas.height / 1.3
  },
  scalable: {
    width: 580,
    height: 192
  },
  imageSrc: './img/terrainLong.png'
}),
new Decorations({
  position: {
    x: 1880,
    y: canvas.height / 1.3
  },
  scalable: {
    width: 580,
    height: 192
  },
  imageSrc: './img/terrainLong.png'
})];

function eachCloud() {
  clouds.forEach(cloud => {
    cloud.update();
  });
}

const clouds = [new Decorations({
  position: {
    x: 100,
    y: canvas.height / 8
  },
  scalable: {
    width: 222,
    height: 72
  },
  imageSrc: './img/cloud.png'
}),
new Decorations({
  position: {
    x: 500,
    y: canvas.height / 3
  },
  scalable: {
    width: 222,
    height: 72
  },
  imageSrc: './img/cloud.png'
}),
new Decorations({
  position: {
    x: 900,
    y: canvas.height / 5
  },
  scalable: {
    width: 222,
    height: 72
  },
  imageSrc: './img/cloud.png'
})];

const player = new Character({
  position: {
    x: 300,
    y: 300
  },
  velocity: {
    x: 0,
    y: 0
  },
  imageSrc: './img/player/pirate-idle.png',
  framesMax: 4,
  sprites: {
    idle: {
      imageSrc: './img/player/pirate-idle.png',
      framesMax: 4,
    },
    idleLeft: {
      imageSrc: './img/player/pirate-idle-left.png',
      framesMax: 4,
    },
    runRight: {
      imageSrc: './img/player/pirate-run-right.png',
      framesMax: 5
    },
    runLeft: {
      imageSrc: './img/player/pirate-run-left.png',
      framesMax: 5
    },
    jump: {
      imageSrc: './img/player/pirate-jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/player/pirate-fall.png',
      framesMax: 0
    },
    attack1: {
      imageSrc: './img/player/pirate-attack1.png',
      framesMax: 2
    },
    hurt: {
      imageSrc: './img/player/pirate-hit.png',
      framesMax: 3
    }
  }
});

let gameOver = false;

function statues() {
  if (gameOver) document.getElementById('status-text').innerHTML = 'Game Over!';
}

function restartGame() {
 location.reload();
}

function animate() {
  if (!gameOver)
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  statues();
  background.update();
  eachBotTerrain();
  eachEnemy();
  player.update();
  eachCloud();
}
animate();