(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = window['galaga'].CONFIG;
  var Eagle = function (state) {
    this.gameState = state;
    this.game = state.game;
    Phaser.Sprite.call(this, this.game, 0, 0, 'fighter_plane');
    this.game.physics.arcade.enable(this);
    this.exists = false;
    this.alive = false;
    this.points = 80;

    this.currentWeapon = CONFIG.enemyWeaponsMap['Spread'];
    this.fireRate = 1050;
    this.nextFire = 0;
    this.collisionDamage = 20;
    this.maxHealth = 25;
    this.currentHealth = this.maxHealth;
  };

  Eagle.prototype = Object.create(Phaser.Sprite.prototype);
  Eagle.prototype.constructor = Eagle;

  Eagle.prototype.create = function(){
  }

  Eagle.prototype.update = function () {
    if (this.alive && this.gameState.player.alive){
      this.fire();
    };
    if(this.y > CONFIG.gameHeight){
      this.kill();
    }
  };

  Eagle.prototype.fire = function(){
    if (this.game.time.time < this.nextFire) { return; }

    this.gameState.enemyWeapons[this.currentWeapon].fire(this);
    this.nextFire = this.game.time.time + this.fireRate;
  }

  Eagle.prototype.takeDamage = function(amount){
    this.currentHealth -= amount;
    if(this.currentHealth <= 0){
      this.die();
    }
  }

  Eagle.prototype.die = function(){
    this.kill();
  }

  Eagle.prototype.revive = function(){
    this.currentHealth = this.maxHealth;
  }

  window['galaga'].Eagle = Eagle;
})();


