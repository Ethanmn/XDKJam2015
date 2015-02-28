var delta = 20; // 50 FPS
var BUILD = 0;
var SHOOT = 1;
var MENU = 2;
var CREDITS = 3;
var HELP = 4;
var ctx;
var mouseDown = false;
var mouseX, mouseY;

var ship;


// INITIALIZE ALL ASSETS IN ASSETS.JS!

var state = MENU; //Ethan, edit this line to see your stuff drawn (change to state = SHOOT;)





function loadGame()
{
   ctx = document.getElementById("canvas").getContext('2d');
   
   /*builder selecting listeners - now done in builder.js
   addEventListener("mousedown", function(e){
      console.log(e);
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      for (var i = 0; i < tiles.length; i++) {
         if(tiles[i].checkCollide(mouseX, mouseY)) {
            console.log("selected");
         }
      }
      mouseDown = true;
   });
   addEventListener("mousemove", function(e){
      if (mouseDown) {
         mouseX = e.offsetX;
         mouseY = e.offsetY;
         console.log("mouse moved");
      }
   });
   addEventListener("mouseup", function(e) {
      mouseDown = false;
   });
   */
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
   menuDraw(ctx);
}