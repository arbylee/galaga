(function(){
  window['galaga'] = window['galaga'] || {};
  var Start = function () {};

  Start.prototype = {
    init: function(){},

    preload: function(){
      this.game.load.image('background', 'assets/background.png');
      this.game.load.spritesheet('ship', 'assets/player_ship_1.png', 24, 32);
      this.game.load.image('fighter_plane', 'assets/mob_vessel_1.png');
      this.game.load.spritesheet('powerup', 'assets/cubes.png', 24, 24);
      for (var i = 1; i <= 1; i++)
      {
          this.load.image('bullet' + i, 'assets/bullet_' + i + '.png');
      }
      for (var i = 1; i <= 1; i++)
      {
          this.load.image('mob_bullet_' + i, 'assets/mob_bullet_' + i + '.png');
      }
    },

    create: function(){
      this.game.add.text(280, 300, "Press spacebar to begin", {font: "24px Arial", fill: "#FFFFFF"})
    },

    update: function(){
      if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.state.start('Game');
      }
    }
  }


  window['galaga'].Start = Start;
})();
