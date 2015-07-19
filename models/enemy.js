(function(){
  window['galaga'] = window['galaga'] || {};

  var Enemy = function (state) {
    this.gameState = state;
    this.game = state.game;
    Phaser.Sprite.call(this, this.game, 0, 0, 'enemy');
    this.exists = false;
    this.alive = false;
    this.weapons = [];
    this.weapons.push(new window['galaga'].EnemyWeapon.SingleBullet(this.game));
    this.currentWeapon = 0;
  };

  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.create = function(){
  }

  Enemy.prototype.update = function () {
    if (this.alive && this.gameState.player.alive){
      this.fire();
    }
    if(this.y > 800){
      this.kill();
    }
  };

  Enemy.prototype.fire = function(){
    this.weapons[this.currentWeapon].fire(this);
  }

  window['galaga'].Enemy = Enemy;
})();

