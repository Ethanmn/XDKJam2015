var delta = 20; // 50 FPS
var ctx;
var mouseDown = false;
var mouseX, mouseY;

var player = new Image(); 
player.src = "tempPlayer.png";

function loadGame()
{
   ctx = document.getElementById("canvas").getContext('2d');
   addEventListener("mousedown", function(e){
      console.log(e);
      mouseDown = true;
   });
   addEventListener("mousemove", function(e){
      if (mouseDown) {
         console.log("mouse moved");
      }
   });
   addEventListener("mouseup", function(e) {
      mouseDown = false;
   });
   gameLoop();
}

function gameLoop()
{
   update(delta);
   draw();

   window.setTimeout(gameLoop, delta);
}

function update(delta) {
   builderUpdate(delta);
   //do stuff here, happens every frame.
}

function draw()
{
   ctx.fillStyle = '#000000';
   ctx.fillRect(0,0, 500, 600);
   ctx.stroke();
   drawPlayer();
}