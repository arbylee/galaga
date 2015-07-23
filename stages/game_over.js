(function(){
  window['galaga'] = window['galaga'] || {};
  var GameOver = function () {};

  GameOver.prototype = {
    init: function(params){
      this.recentScore = params.recentScore;
    },

    preload: function(){},

    create: function(){
      this.game.add.text(340, 200, "Game Over", {font: "24px Arial", fill: "#FFFFFF"})
      this.game.add.text(340, 300, "Score: " + this.recentScore, {font: "24px Arial", fill: "#FFFFFF"})
      this.game.add.text(250, 400, "Press spacebar to play again", {font: "24px Arial", fill: "#FFFFFF"})
    },

    update: function(){
      if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        this.game.state.start('Game');
      }
    }
  }


  window['galaga'].GameOver = GameOver;
})();
