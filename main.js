var delta = 20; // 50 FPS
var BUILD = 0;
var SHOOT = 1;
var ctx;
var mouseDown = false;
var mouseX, mouseY;

// INITIALIZE ALL ASSETS IN ASSETS.JS!

var state = BUILD; //Ethan, edit this line to see your stuff drawn (change to state = SHOOT;)





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
      //ethan put your stuff here for update
   }
   //do stuff here, happens every frame.
}

function draw()
{
   ctx.fillStyle = '#000000';
   ctx.fillRect(0,0, 500, 600);
   ctx.stroke();
   if (state == SHOOT) {
      drawPlayer();
   }
   if (state == BUILD) {
      builderDraw();
   }
}