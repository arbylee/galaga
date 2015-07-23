(function(){
  window['galaga'] = window['galaga'] || {};

  var Player = function (state) {
    this.gameState = state;
    this.game = state.game;
    this.moveSpeed = 230;
    Phaser.Sprite.call(this, this.game, 400, 300, 'ship');
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.animations.add('left', [0, 1], 4, true);
    this.animations.add('right', [3, 4], 4, true);
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.weapons = [];
    this.weapons.push(new window['galaga'].Weapon.SingleBullet(this.game));
    this.currentWeapon = 0;
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
  }

  Player.prototype.constructor = Player;
  Player.prototype = Object.create(Phaser.Sprite.prototype);

  Player.prototype.update = function(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if(!this.cursors.right.isDown && !this.cursors.left.isDown){
      this.animations.stop();
      this.frame = 2;
    } else {
      if(this.cursors.left.isDown){
        this.body.velocity.x -= this.moveSpeed;
        this.animations.play('left');
      }
      if(this.cursors.right.isDown){
        this.body.velocity.x += this.moveSpeed;
        this.animations.play('right');
      }
    }

    if(this.cursors.up.isDown){
      this.body.velocity.y -= this.moveSpeed;
    }
    if(this.cursors.down.isDown){
      this.body.velocity.y += this.moveSpeed;
    }
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.weapons[this.currentWeapon].fire(this);
    }
  }

  Player.prototype.takeDamage = function(amount){
    this.currentHealth -= amount;
    if(this.currentHealth <= 0){
      this.die();
    }
  };

  Player.prototype.die = function(){
    this.kill();
    this.game.state.start('GameOver', true, false, {recentScore: this.gameState.score});
  };
  window['galaga'].Player = Player;
})();
