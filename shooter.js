addEventListener("mousedown", shooterCheck, false);

var STARTX;
var STARTY;
var shipTarX;
var shipTarY;
var shipMid;
var bulletList = [];

function loadShooter()
{
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
   movePlayer(delta);
   for (var i = 0; i < bulletList.length; i++)
   {
      bulletList[i].update(delta);
      if (bulletList[i].py < -50 ||
          bulletList[i].py > BG_HEIGHT + 50 ||
          bulletList[i].px < -50 ||
          bulletList[i].py > BG_WIDTH + 50)
      {
         bulletList.splice(i--, 1);
      }
   }
   
}

function drawShooter()
{
   ship.draw(ctx);
   for (var i = 0; i < bulletList.length; i++)
   {
      //console.log("draw bullet #" + i);
      bulletList[i].draw(ctx);
   }
}

function movePlayer(delta)
{
   /* Left thrust shoots left, moves RIGHT
   right thrust shoots right, move LEFT */
   var lThrust = ship.leftThrust * magic;
   var rThrust = ship.rightThrust * magic;
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

function shooterCheck(e)
{
   mouseX = e.offsetX;
   mouseY = e.offsetY;
   
   if (mouseY > (BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID)))
   {
      console.log("Move!");
      shipTarX = mouseX - shipMid;
   }
   else
   {
      console.log("Shoot!");
      
      var ang = Math.atan2(mouseY - (BULLET_SIZE / 2) - ship.y, mouseX - (BULLET_SIZE / 2) - ship.x);
      console.log(ang * (180/Math.PI));
      var vx = Math.cos(ang) * BULLET_VEL;
      var vy = Math.sin(ang) * BULLET_VEL;
      
      bulletList.push(new Bullet(ship.x, ship.y, vx, vy));
   }
   
}