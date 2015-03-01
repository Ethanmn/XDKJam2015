var delta = 20; // 50 FPS
var magic = delta / 100;
var BUILD = 0;
var SHOOT = 1;
var MENU = 2;
var CREDITS = 3;
var TUTORIAL1 = 5;
var TUTORIAL2 = 6;
var GAMEOVER = 7;
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
   
   //loadShooter();
   gameLoop();
}

function gameLoop()
{
   update(delta);
   draw();

   window.setTimeout(gameLoop, delta);
}

function update(delta) {
	if (state == MENU) {
      switchBackground(0);
   }
   else if (state == BUILD) {
   	switchBackground(1);
      builderUpdate(delta);
   }
   else if (state == SHOOT) {
   	switchBackground(2);
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
      case CREDITS:
         creditDraw(ctx);
         break;
      case TUTORIAL1:
         tutorial1Draw(ctx);
         break;
      case TUTORIAL2:
         tutorial2Draw(ctx);
         break;
      case GAMEOVER:
         gameOverDraw(ctx);
         break;
      default:
         break;
   }
   
}