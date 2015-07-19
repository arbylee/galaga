(function(){
  window['galaga'] = window['galaga'] || {};
  var GameOver = function () {};

  GameOver.prototype = {
    init: function(){},

    preload: function(){},

    create: function(){
      this.game.add.text(340, 200, "Game Over", {font: "24px Arial", fill: "#FFFFFF"})
      this.game.add.text(250, 300, "Press spacebar to play again", {font: "24px Arial", fill: "#FFFFFF"})
    },

    update: function(){
      if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.state.start('Game');
      }
    }
  }


  window['galaga'].GameOver = GameOver;
})();
