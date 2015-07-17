(function(){
  window['galaga'] = window['galaga'] || {};

  var Enemy = function () {
      Phaser.Sprite.call(this, game, 0, 0, 'enemy');
      this.exists = false;
      this.alive = false;
  };

  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.update = function () {
    if(this.y > 800){
      this.kill();
    }
  };
  window['galaga'].Enemy = Enemy;
})();
