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
      this.weapons = [];
      this.game.add.sprite(0, 0, 'background');
      this.player = this.game.add.sprite(400, 300, 'ship');
      this.player.animations.add('left', [0, 1], 4, true);
      this.player.animations.add('right', [3, 4], 4, true);
      this.game.physics.arcade.enable(this.player);
      this.player.body.collideWorldBounds = true;
      cursors = this.game.input.keyboard.createCursorKeys();

      this.weapons.push(new window['galaga'].Weapon.SingleBullet(this.game));

      this.enemies = this.game.add.group();
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

      if(!cursors.right.isDown && !cursors.left.isDown){
        this.player.animations.stop();
        this.player.frame = 2;
      } else {
        if(cursors.left.isDown){
          this.player.body.velocity.x -= this.playerMoveSpeed;
          this.player.animations.play('left');
        }
        if(cursors.right.isDown){
          this.player.body.velocity.x += this.playerMoveSpeed;
          this.player.animations.play('right');
        }
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
      this.game.state.start('GameOver');
    },
    spawnEnemy: function(){
      var enemy = this.enemies.getFirstDead();
      enemy.reset(this.game.rnd.between(0, CONFIG.gameWidth), -100);
      enemy.body.velocity.y = 130;
    }
  }

  window['galaga'].Game = Game;
})();
