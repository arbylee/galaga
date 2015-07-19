(function(){
  window['galaga'] = window['galaga'] || {};
  var cursors;
  var CONFIG = window['galaga'].CONFIG;

  var Game = function () {
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

  Game.prototype = {
    init: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function(){
    },

    create: function(){
      this.game.add.sprite(0, 0, 'background');
      this.player = this.game.add.sprite(400, 300, 'ship')
      this.game.physics.arcade.enable(this.player);
      this.player.body.collideWorldBounds = true;
      cursors = this.game.input.keyboard.createCursorKeys();

      this.weapons.push(new window['galaga'].Weapon.SingleBullet(this.game));

      this.enemies = this.game.add.group();
      //this.enemies.createMultiple(20, 'enemy');
      this.enemies.enableBody = true;
      this.game.physics.arcade.enable(this.enemies);
      for (i = 0; i < 50; i++) {
        this.enemies.add(new window['galaga'].Enemy(this));
      }

      this.enemyCreateLoop = this.game.time.events.loop(1500, this.spawnEnemy, this);
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

      this.physics.arcade.overlap(this.weapons, this.enemies, this.weaponsHitEnemy, null, this);
      this.physics.arcade.overlap(this.player, this.enemies, this.enemiesHitPlayer, null, this);
    },
    weaponsHitEnemy: function(weapon, enemy){
      weapon.kill();
      enemy.kill();
    },
    enemiesHitPlayer: function(player, enemy){
      player.kill();
      enemy.kill();
    },
    spawnEnemy: function(){
      var enemy = this.enemies.getFirstDead();
      enemy.reset(this.game.rnd.between(0, CONFIG.gameWidth), -100);
      enemy.body.velocity.y = 130;
    }
  }

  window['galaga'].Game = Game;
})();
