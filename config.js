(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = {
    gameWidth: 800,
    gameHeight: 600,
    enemyWeaponsMap: {
      SingleBullet: 0,
      Spread: 1
    },
    defaultVelocity: 130
  };

  window['galaga'].CONFIG = CONFIG;
})();
