(function(){
  window['galaga'] = window['galaga'] || {};
  var CONFIG = window['galaga'].CONFIG;

  var Game = function () {
      this.background = null;
      this.foreground = null;

      this.player = null;
  };

  Game.prototype = {
    init: function(){
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    preload: function(){
    },

    create: function(){
      this.game.add.sprite(0, 0, 'background');
      this.player = new window['galaga'].Player(this);

      this.healthText = this.game.add.text(10, CONFIG.gameHeight - 30, "Health: " + this.player.currentHealth, {font: "16px Arial", fill: "#FFFFFF"});

      this.enemyWeapons = [];
      this.enemyWeapons.push(new window['galaga'].EnemyWeapon.SingleBullet(this.game));

      this.enemies = this.game.add.group();
      this.enemies.enableBody = true;
      for (i = 0; i < 50; i++) {
        this.enemies.add(new window['galaga'].Enemy(this));
      }

      this.enemyCreateLoop = this.game.time.events.loop(1500, this.spawnEnemy, this);
    },

    update: function(){
      this.physics.arcade.overlap(this.player.weapons, this.enemies, this.weaponsHitEnemy, null, this);
      this.physics.arcade.overlap(this.player, this.enemies, this.enemiesHitPlayer, null, this);
      this.physics.arcade.overlap(this.player, this.enemyWeapons, this.enemyWeaponsHitPlayer, null, this);
      this.healthText.text = "Health: " + this.player.currentHealth;
    },
    weaponsHitEnemy: function(weapon, enemy){
      weapon.kill();
      enemy.kill();
    },
    enemiesHitPlayer: function(player, enemy){
      player.takeDamage(enemy.collisionDamage);
      enemy.kill();
    },
    enemyWeaponsHitPlayer: function(player, weapon){
      player.takeDamage(weapon.power);
      weapon.kill();
    },
    spawnEnemy: function(){
      var enemy = this.enemies.getFirstDead();
      enemy.reset(this.game.rnd.between(0, CONFIG.gameWidth), -100);
      enemy.body.velocity.y = 130;
    }
  }

  window['galaga'].Game = Game;
})();
