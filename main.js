var delta = 20; // 50 FPS
var magic = delta / 100;
var BUILD = 0;
var SHOOT = 1;
var MENU = 2;
var CREDITS = 3;
var HELP = 4;
var STORE = 5;
var ctx;
var mouseDown = false;
var mouseX, mouseY;
var BG_HEIGHT = 480;
var BG_WIDTH = 352;
var money = 2000;

var ship;

// INITIALIZE ALL ASSETS IN ASSETS.JS!

var state = MENU; //Ethan, edit this line to see your stuff drawn (change to state = SHOOT;)


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
   switch (state) {
      case SHOOT:
         drawShooter();
         break;
      case BUILD:
         builderDraw();
         break;
      case MENU:
         menuDraw(ctx);
         break;
      case STORE:
         storeDraw(ctx);
         break;
   }
   
}