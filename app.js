var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
var cursors;

var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {

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


var Weapon = {};

////////////////////////////////////////////////////
//  A single bullet is fired in front of the ship //
////////////////////////////////////////////////////

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet1'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 24;
    var y = source.y - 8;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};

var PhaserGame = function () {

    this.background = null;
    this.foreground = null;

    this.player = null;
    this.cursors = null;
    this.speed = 300;

    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;
    this.playerMoveSpeed = 230;
};

PhaserGame.prototype = {
  init: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  },

  preload: function(){
    this.game.load.image('background', 'assets/background.png')
    this.game.load.image('ship', 'assets/ship.png')
    for (var i = 1; i <= 1; i++)
    {
        this.load.image('bullet' + i, 'assets/bullet_' + i + '.png');
    }
  },

  create: function(){
    this.game.add.sprite(0, 0, 'background');
    this.player = this.game.add.sprite(400, 300, 'ship')
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    this.weapons.push(new Weapon.SingleBullet(this.game));
  },

  update: function(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    if(cursors.left.isDown){
      this.player.body.velocity.x -= this.playerMoveSpeed;
    }
    if(cursors.right.isDown){
      this.player.body.velocity.x += this.playerMoveSpeed;
    }
    if(cursors.up.isDown){
      this.player.body.velocity.y -= this.playerMoveSpeed;
    }
    if(cursors.down.isDown){
      this.player.body.velocity.y += this.playerMoveSpeed;
    }
    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.weapons[this.currentWeapon].fire(this.player);
    }
  }
}

this.game.state.add('Game', PhaserGame, true);
