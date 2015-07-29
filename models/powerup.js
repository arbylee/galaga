(function(){
  window['galaga'] = window['galaga'] || {};

  var Powerup = function (state) {
    this.game = state.game
    Phaser.Sprite.call(this, this.game, 0, 0, 'powerup');
    this.game.physics.arcade.enable(this);
    this.alive = false;
    this.exists = false;
    this.outOfBoundsKill = true;
    this.animations.add('idle', [0 + 3, 1 + 3, 2 + 3, 1 + 3], 10, true);
    this.animations.play('idle');

    this.bonus = 0.25;
  }

  Powerup.prototype = Object.create(Phaser.Sprite.prototype);
  Powerup.prototype.constructor = Powerup;

  Powerup.prototype.apply = function(target){
    target.power += this.bonus;
  }

  window['galaga'].Powerup = Powerup;
})();
