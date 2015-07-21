(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = window['galaga'].CONFIG;
  var Enemy = function (state) {
    this.gameState = state;
    this.game = state.game;
    Phaser.Sprite.call(this, this.game, 0, 0, 'enemy');
    this.game.physics.arcade.enable(this);
    this.exists = false;
    this.alive = false;
    this.currentWeapon = 0;

    this.fireRate = 600;
    this.nextFire = 0;
    this.collisionDamage = 20;
    this.maxHealth = 30;
    this.currentHealth = this.maxHealth;
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

  Enemy.prototype.takeDamage = function(amount){
    this.currentHealth -= amount;
    if(this.currentHealth <= 0){
      this.die();
    }
  }

  Enemy.prototype.die = function(){
    this.kill();
  }

  Enemy.prototype.revive = function(){
    this.currentHealth = this.maxHealth;
  }

  window['galaga'].Enemy = Enemy;
})();

