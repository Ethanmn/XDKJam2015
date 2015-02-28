var delta = 20; // 50 FPS
var BUILD = 0;
var SHOOT = 1;
var MENU = 2;
var CREDITS = 3;
var HELP = 4;
var ctx;
var mouseDown = false;
var mouseX, mouseY;
var BG_HEIGHT = 480;
var BG_WIDTH = 352;

var ship;


// INITIALIZE ALL ASSETS IN ASSETS.JS!

var state = SHOOT; //Ethan, edit this line to see your stuff drawn (change to state = SHOOT;)





function loadGame()
{
   ctx = document.getElementById("canvas").getContext('2d');
   
   loadShooter();
   
   gameLoop();
}

function gameLoop()
{
   update(delta);
   draw();

   window.setTimeout(gameLoop, delta);
}

function update(delta) {
   if (state == BUILD) {
      builderUpdate(delta);
   }
   if (state == SHOOT) {
      updateShooter(delta)
   }
   //do stuff here, happens every frame.
}

function draw()
{
   ctx.fillStyle = '#000000';
   ctx.fillRect(0,0, BG_WIDTH, BG_HEIGHT);
   ctx.stroke();
   if (state == SHOOT) {
      drawPlayer();
   }
   if (state == BUILD) {
      builderDraw();
   }
   menuDraw(ctx);
}