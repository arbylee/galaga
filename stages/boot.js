window.onload = function(){
  var CONFIG = window['galaga'].CONFIG;
  var game = new Phaser.Game(CONFIG.gameWidth, CONFIG.gameHeight, Phaser.AUTO, 'game');
  game.state.add('Start', window['galaga'].Start, true);
  game.state.add('Game', window['galaga'].Game, true);
  game.state.start('Start');
}
