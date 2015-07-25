(function(){
  window['galaga'] = window['galaga'] || {};

  var Powerup = function (state) {
    this.game = state.game
    Phaser.Sprite.call(this, this.game, 0, 0, 'powerup');
    this.game.physics.arcade.enable(this);
    this.alive = false;
    this.exists = false;
    this.outOfBoundsKill = true;
  }

  Powerup.prototype = Object.create(Phaser.Sprite.prototype);
  Powerup.prototype.constructor = Powerup;

  window['galaga'].Powerup = Powerup;
})();
