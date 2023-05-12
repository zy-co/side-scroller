// listener 
class InputHandler {
  constructor(){
    this.keys = [];
    this.touchY = '';
    this.touchX = '';
    this.touchTreshold = 30;
    window.addEventListener('keydown', e => {
      if ((e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight')
      && this.keys.indexOf(e.key) === -1) {
         this.keys.push(e.key);
      } else if (e.key === 'enter' && gameOver) restartGame();
    });
    window.addEventListener('keyup', e => {
      if ((e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight')
      && this.keys.indexOf(e.key) === 1) {
         this.keys.push(e.key);
      }});
      window.addEventListener('touchstart', e => {
        this.touchY = e.changedTouches[0].pageY;
        this.touchX = e.changedTouches[0].pageX;
      });
      window.addEventListener('touchmove', e => {
        const swipeDistance = e.changedTouches[0].pageY - this.touchY;
        const xSwipe = e.changedTouches[0].pageX - this.touchX;
        if (swipeDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
        if (xSwipe < -this.touchTreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');
        if (xSwipe > this.touchTreshold && this.keys.indexOf('swipe right') === -1) this.keys.push('swipe right');
        else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
          this.keys.push('swipe down');
          if (gameOver) restartGame();
        }});
        window.addEventListener('touchend', e => {
          this.keys.splice(this.keys.indexOf('swipe-up'), 1);
          this.keys.splice(this.keys.indexOf('swipe-down'), 1);
          this.keys.splice(this.keys.indexOf('swipe-left'), 1);
          this.keys.splice(this.keys.indexOf('swipe-right'), 1);
        }
      );
    }
  }

function controls() {
  if ((input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('swipe right') > -1 && player.position.x < 500)) {
    player.switchSprite('runRight');
    player.velocity.x = +8;
  } else if ((input.keys.indexOf('ArrowLeft') > -1  || input.keys.indexOf('swipe left') > -1 && player.position.x > 23)) {
    player.switchSprite('runLeft');
    player.velocity.x = -8;
  } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) ) {
    player.switchSprite('jump');
    player.velocity.y = -8;
    document.getElementById('jump-sfx').play();
  } else if (player.velocity.y > botTerrains.height) {
    player.switchSprite('fall');
  } else if ((input.keys.indexOf('ArrowDown') > -1 || input.keys.indexOf('swipe down') > -1)) {
    player.velocity.y = 0;
  } else {
    player.velocity.x = 0;
    if ((input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('swipe right') > -1)) {
      player.switchSprite('runRight');
      eachDecorationsNegativeValue();
    } else if ((input.keys.indexOf('ArrowLeft') > -1  || input.keys.indexOf('swipe left') > -1)) {
      player.switchSprite('runLeft');
      eachDecorationsPositiveValue();
    } else player.switchSprite('idle');
  }
  window.addEventListener("click", () => {
    player.switchSprite('attack1');
    player.playerAttacking = true;
    setTimeout(function() {
      player.playerAttacking = false;
    }, 100);
  });
}

function eachDecorationsNegativeValue() {
  botTerrains.forEach(botTerrain => {
    botTerrain.position.x -= 4;
  });
  clouds.forEach(cloud => {
    cloud.position.x -= 4;
  });
}

function eachDecorationsPositiveValue() {
  botTerrains.forEach(botTerrain => {
    botTerrain.position.x += 4;
  });
  clouds.forEach(cloud => {
    cloud.position.x += 4;
  });
}
// listener 