(function(){
  window['galaga'] = window['galaga'] || {};

  var CONFIG = {
    gameWidth: 800,
    gameHeight: 600,
    enemyWeaponsMap: {
      SingleBullet: 0,
      Spread: 1
    },
    defaultVelocity: 130,
    defaultPowerupVelocity: 80
  };

  window['galaga'].CONFIG = CONFIG;
})();
