(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = window['galaga'].CONFIG;
  var Enemy = function (state) {
    this.gameState = state;
    this.game = state.game;
    Phaser.Sprite.call(this, this.game, 0, 0, 'enemy');
    this.exists = false;
    this.alive = false;
    this.currentWeapon = 0;

    this.fireRate = 600;
    this.nextFire = 0;
  };

  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.create = function(){
  }

  Enemy.prototype.update = function () {
    if (this.alive && this.gameState.player.alive){
      this.fire();
    };
    if(this.y > CONFIG.gameHeight){
      this.kill();
    }
  };

  Enemy.prototype.fire = function(){
    if (this.game.time.time < this.nextFire) { return; }

    this.gameState.enemyWeapons[this.currentWeapon].fire(this);
    this.nextFire = this.game.time.time + this.fireRate;
  }

  window['galaga'].Enemy = Enemy;
})();

