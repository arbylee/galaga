(function(){
  window['galaga'] = window['galaga'] || {};
  var Start = function () {};

  Start.prototype = {
    init: function(){},

    preload: function(){
      this.game.load.image('background', 'assets/background.png')
      this.game.load.image('ship', 'assets/ship.png')
      this.game.load.image('enemy', 'assets/enemy.png')
      for (var i = 1; i <= 1; i++)
      {
          this.load.image('bullet' + i, 'assets/bullet_' + i + '.png');
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
