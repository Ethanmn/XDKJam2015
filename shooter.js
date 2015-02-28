var STARTX;
var STARTY;
var shipTarX ;
var shipTarY;
var startUpdate = false;
var shipMid;

function loadShooter()
{
   addEventListener("mousedown", shooterCheck, false);
   
   STARTX = (BG_WIDTH / 2);
   STARTY = BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID);

   ship = new Ship([new Tile(testTileImage, GRID * 5, GRID * 6, [true, true, true, true], COCKPIT),new Tile(testTileImage, GRID * 3, GRID * 2, [true, true, true, true], COCKPIT)], 2, 4);
   ship.x = STARTX;
   ship.y = STARTY;
   ship.leftThrust = 100;
   ship.rightThrust = 1;
  
   shipMid = (SHIP_WIDTH * INTERNAL_GRID) / 2;
   shipTarX = STARTX;
   shipTarY = STARTY;
}

function updateShooter(delta)
{
   /* Left thrust shoots left, moves RIGHT
      right thrust shoots right, move LEFT */
   var lThrust = ship.leftThrust * (delta / 100);
   var rThrust = ship.rightThrust * (delta / 100);
   if (ship.x < shipTarX)
   {
      if (ship.x + lThrust > shipTarX)
      {
         ship.x = shipTarX;
      }
      else
      {
         ship.x += lThrust;
      }
   }
   else if (ship.x > shipTarX)
   {
      
      if (ship.x + rThrust < shipTarX)
      {
         ship.x = shipTarX;
      }
      else
      {
         ship.x -= rThrust;
      }
   }
   else
   {
      ship.x = shipTarX;
   }
   
}

function drawPlayer()
{
   ship.draw(ctx);
}

function shooterCheck(e)
{
   if (e.offsetY > (BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID)))
   {
      console.log("Move!");
      shipTarX = e.offsetX - shipMid;
   }
   else
   {
      console.log("Shoot!");
   }
   
}