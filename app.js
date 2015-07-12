var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;
var cursors;

function preload(){
  game.load.image('background', 'assets/background.png')
  game.load.image('ship', 'assets/ship.png')
}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'background');
  player = game.add.sprite(400, 300, 'ship')
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
}

function update(){
  cursors = game.input.keyboard.createCursorKeys();
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  if(cursors.left.isDown){
    player.body.velocity.x -= 150;
  }
  if(cursors.right.isDown){
    player.body.velocity.x += 150;
  }
  if(cursors.up.isDown){
    player.body.velocity.y -= 150;
  }
  if(cursors.down.isDown){
    player.body.velocity.y += 150;
  }
}



function foopreload(){
  game.load.atlasJSONHash('cityscene', 'assets/cityscene.png', 'assets/cityscene.json');
}

var capguy;
function foo(){
  // create capguy sprite
  capguy = game.add.sprite(100, 180, 'cityscene', 'capguy/walk/0001.png');

  // scale it down a bit
  capguy.scale.setTo(0.5,0.5);

  // add animation phases
  capguy.animations.add('walk', [
      'capguy/walk/0001.png',
      'capguy/walk/0002.png',
      'capguy/walk/0003.png',
      'capguy/walk/0004.png',
      'capguy/walk/0005.png',
      'capguy/walk/0006.png',
      'capguy/walk/0007.png',
      'capguy/walk/0008.png'
  ], 10, true, false);

  // play animation
  capguy.animations.play('walk');
}

function fooupdate(){

  capguy.x += 3;
  if(capguy.x > 800)
  {
      capguy.x = -50;
  }
}
