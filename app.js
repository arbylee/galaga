var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
var cursors;

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

    this.weapons.push(new window['galaga'].Weapon.SingleBullet(this.game));
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
