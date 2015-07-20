(function(){
  window['galaga'] = window['galaga'] || {};

  var EnemyBullet = function (game, key) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;
  };

  EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
  EnemyBullet.prototype.constructor = EnemyBullet;

  EnemyBullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

      gx = gx || 0;
      gy = gy || 0;

      this.reset(x, y);
      this.scale.set(1);

      this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

      this.angle = angle;

      this.body.gravity.set(gx, gy);

  };

  EnemyBullet.prototype.update = function () {

      if (this.tracking)
      {
          this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
      }

      if (this.scaleSpeed > 0)
      {
          this.scale.x += this.scaleSpeed;
          this.scale.y += this.scaleSpeed;
      }

  };

  var EnemyWeapon = {};

  ////////////////////////////////////////////////////
  //  A single bullet is fired in front of the ship //
  ////////////////////////////////////////////////////

  EnemyWeapon.SingleBullet = function (game) {

      Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

      this.bulletSpeed = 400;

      for (var i = 0; i < 64; i++)
      {
          this.add(new EnemyBullet(game, 'mob_bullet_1'), true);
      }

      return this;

  };

  EnemyWeapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
  EnemyWeapon.SingleBullet.prototype.constructor = EnemyWeapon.SingleBullet;

  EnemyWeapon.SingleBullet.prototype.fire = function (source) {
    var x = source.x + 18;
    var y = source.y + 32;
    this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
  };

  window['galaga'].EnemyWeapon = EnemyWeapon;
})();


