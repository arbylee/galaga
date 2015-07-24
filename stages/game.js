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
      this.score = 0;
      this.scoreText = this.game.add.text(CONFIG.gameWidth - 80, CONFIG.gameHeight - 30, "Score: " + this.score, {font: "16px Arial", fill: "#FFFFFF"});

      this.enemyWeapons = [];
      this.enemyWeapons.push(new window['galaga'].EnemyWeapon.SingleBullet(this.game));
      this.enemyWeapons.push(new window['galaga'].EnemyWeapon.Spread(this.game));

      this.enemies = [];
      this.enemies[0] = this.game.add.group();
      for (i = 0; i < 20; i++) {
        this.enemies[0].add(new window['galaga'].FighterPlane(this));
      }

      this.enemies[1] = this.game.add.group();
      for (i = 0; i < 20; i++) {
        this.enemies[1].add(new window['galaga'].Eagle(this));
      }

      this.fighterPlaneCreateLoop = this.game.time.events.loop(1500, this.spawnEnemy, this, this.enemies[0]);
      this.eagleCreateLoop = this.game.time.events.loop(2500, this.spawnEnemy, this, this.enemies[1]);
    },

    update: function(){
      this.physics.arcade.overlap(this.player.weapons, this.enemies, this.bulletsHitEnemy, null, this);
      this.physics.arcade.overlap(this.player, this.enemies, this.enemiesHitPlayer, null, this);
      this.physics.arcade.overlap(this.player, this.enemyWeapons, this.enemyBulletsHitPlayer, null, this);
      this.healthText.text = "Health: " + this.player.currentHealth;
    },
    bulletsHitEnemy: function(bullet, enemy){
      bullet.kill();
      enemy.takeDamage(bullet.power);
      if(enemy.currentHealth <= 0){
        this.killEnemy(enemy);
      }
    },
    enemiesHitPlayer: function(player, enemy){
      player.takeDamage(enemy.collisionDamage);
      this.killEnemy(enemy);
    },
    enemyBulletsHitPlayer: function(player, bullet){
      player.takeDamage(bullet.power);
      bullet.kill();
    },
    spawnEnemy: function(enemyGroup){
      var enemy = enemyGroup.getFirstDead();
      enemy.revive();
      enemy.reset(this.game.rnd.between(0, CONFIG.gameWidth), -100);
      enemy.body.velocity.y = CONFIG.defaultVelocity;
    },
    updateGui: function(){
      this.scoreText.text = "Score: " + this.score;
    },
    killEnemy: function(enemy){
      this.score += enemy.points;
      this.updateGui();
      enemy.die();
    }
  }

  window['galaga'].Game = Game;
})();
