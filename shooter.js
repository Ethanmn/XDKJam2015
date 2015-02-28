addEventListener("mousedown", shooterCheck, false);

var STARTX;
var STARTY;
var shipTarX;
var shipTarY;
var shipMid;
var bulletList = [];
var asteroidList = [];

function loadShooter()
{
   astID = 0;
   
   STARTX = (BG_WIDTH / 2) + (SHIP_WIDTH * INTERNAL_GRID / 2);
   STARTY = BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID);

   //ship = new Ship([new Tile(testTileImage, GRID * 5, GRID * 6, [true, true, true, true], COCKPIT),new Tile(testTileImage, GRID * 3, GRID * 2, [true, true, true, true], COCKPIT)], 2, 4);
   ship.x = STARTX;
   ship.y = STARTY;
   ship.leftThrust = 1;
   ship.rightThrust = 1;
   ship.numReactors = 1;
  
   shipMid = (SHIP_WIDTH * INTERNAL_GRID) / 2;
   shipTarX = STARTX;
   shipTarY = STARTY;
}

function updateShooter(delta)
{
   for (var i = 0; i < bulletList.length; i++)
   {
      if (bulletList[i].posY < -BULLET_SIZE ||
          bulletList[i].posY > BG_HEIGHT + BULLET_SIZE ||
          bulletList[i].posX < -BULLET_SIZE ||
          bulletList[i].posX > BG_WIDTH + BULLET_SIZE)
      {
         bulletList.splice(i--, 1);
         break
      }
      bulletList[i].update(delta);
   }
   
   spawnAsteroid();
   for (var i = 0; i < asteroidList.length; i++)
   {
      if (asteroidList[i].posY < -(asteroidList[i].size) ||
          asteroidList[i].posY > BG_HEIGHT + asteroidList[i].size ||
          asteroidList[i].posX < -(asteroidList[i].size) ||
          asteroidList[i].posX > BG_WIDTH + asteroidList[i].size)
      {
         asteroidList.splice(i--, 1);
         break;
      }
      asteroidList[i].update(delta);
   }
   movePlayer(delta);
   ship.update(delta);
   
   bulletCollision();
}

function drawShooter()
{
   ship.draw(ctx);
   for (var i = 0; i < bulletList.length; i++)
   {
      bulletList[i].draw(ctx);
   }
   for (var i = 0; i < asteroidList.length; i++)
   {
      asteroidList[i].draw(ctx);
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
   if (state == SHOOT) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;

      if (mouseY > (BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID)))
      {
         setTarget();
      }
      else
      {
         shoot();
      }
   }
}

function setTarget()
{
   shipTarX = mouseX - shipMid;
   if (shipTarX < 0)
   {
      shipTarX = 0;
   }
   if (shipTarX > BG_WIDTH - SHIP_WIDTH * INTERNAL_GRID) 
   {
      shipTarX = BG_WIDTH - SHIP_WIDTH * INTERNAL_GRID;
   }
}

function shoot()
{
   if (ship.listWeaps.length > 0)
      playSFX(LASER);
   
   for (var k = 0; k < ship.listWeaps.length; k++)
   {
      if (ship.energy >= 5)
      {
         var ang = Math.atan2(mouseY + (BULLET_SIZE / 2) - INTERNAL_GRID/2 - ship.listWeaps[k].y * INTERNAL_GRID - ship.y, mouseX + (BULLET_SIZE / 2) - INTERNAL_GRID/2 - ship.x - ship.listWeaps[k].x * INTERNAL_GRID);
         var vx = Math.cos(ang) * BULLET_VEL;
         var vy = Math.sin(ang) * BULLET_VEL;
         ship.energy -= 5;
         
         bulletList.push(new Bullet(ship.x + ship.listWeaps[k].x * INTERNAL_GRID, ship.y + ship.listWeaps[k].y * INTERNAL_GRID, vx, vy));
      }
      
   }
}

function spawnAsteroid()
{
   if (Math.random() < 0.03)
   {
      var astSize = Math.random() * 2;
      var astPosX = Math.random() * (BG_WIDTH - astSize) + astSize;
      var astVelX = Math.random() * (2) - 1;
      var astVelY = Math.random() * (5 - 1) + 1;
      
      asteroidList.push(new Asteroid(astPosX, -astSize, astVelX, astVelY, 1, 1));
   }
}

function bulletCollision()
{
   var k = bulletList.length;
   while (k--)
   {
      var l = asteroidList.length;
      while (l--)
      {
         if (bulletList[k].posX > asteroidList[l].posX - bulletList[k].width &&
             bulletList[k].posX < asteroidList[l].posX + asteroidList[l].width &&
             bulletList[k].posY > asteroidList[l].posY - bulletList[k].height &&
             bulletList[k].posY < asteroidList[l].posY + asteroidList[l].height)
         {
            bulletList.splice(k, 1);
            asteroidList[l].health--;
            break;
         }
      }
   }
}