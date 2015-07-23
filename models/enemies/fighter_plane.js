(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = window['galaga'].CONFIG;
  var FighterPlane = function (state) {
    this.gameState = state;
    this.game = state.game;
    Phaser.Sprite.call(this, this.game, 0, 0, 'fighter_plane');
    this.game.physics.arcade.enable(this);
    this.exists = false;
    this.alive = false;
    this.points = 120;

    this.currentWeapon = CONFIG.enemyWeaponsMap['SingleBullet'];
    this.fireRate = 900;
    this.nextFire = 0;
    this.collisionDamage = 20;
    this.maxHealth = 15;
    this.currentHealth = this.maxHealth;
  };

  FighterPlane.prototype = Object.create(Phaser.Sprite.prototype);
  FighterPlane.prototype.constructor = FighterPlane;

  FighterPlane.prototype.create = function(){
  }

  FighterPlane.prototype.update = function () {
    if (this.alive && this.gameState.player.alive){
      this.fire();
    };
    if(this.y > CONFIG.gameHeight){
      this.kill();
    }
  };

  FighterPlane.prototype.fire = function(){
    if (this.game.time.time < this.nextFire) { return; }

    this.gameState.enemyWeapons[this.currentWeapon].fire(this);
    this.nextFire = this.game.time.time + this.fireRate;
  }

  FighterPlane.prototype.takeDamage = function(amount){
    this.currentHealth -= amount;
  }

  FighterPlane.prototype.die = function(){
    this.kill();
  }

  FighterPlane.prototype.revive = function(){
    this.currentHealth = this.maxHealth;
  }

  window['galaga'].FighterPlane = FighterPlane;
})();

