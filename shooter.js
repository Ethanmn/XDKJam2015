addEventListener("mousedown", shooterCheck, false);
//addEventListener("touchstart", shooterCheck, false);

var STARTX;
var STARTY;
var shipTarX;
var shipTarY;
var shipMid;
var bulletList = [];
var asteroidList = [];
var difficulty;
var gunCD;

function loadShooter()
{
   difficulty = 3000;
   gunCD = 0;
   asteroidList = [];
   bulletList = [];
   
   STARTX = (BG_WIDTH / 2) + (SHIP_WIDTH * INTERNAL_GRID / 2);
   STARTY = BG_HEIGHT - (SHIP_HEIGHT * INTERNAL_GRID);

   //ship = new Ship([new Tile(testTileImage, GRID * 5, GRID * 6, [true, true, true, true], COCKPIT),new Tile(testTileImage, GRID * 3, GRID * 2, [true, true, true, true], COCKPIT)], 2, 4);
   ship.x = STARTX;
   ship.y = STARTY;
  
   shipMid = (SHIP_WIDTH * INTERNAL_GRID) / 2;
   shipTarX = STARTX;
   shipTarY = STARTY;
}

function updateShooter(delta)
{
   if (ship.tiles.length == 0) {
      state = GAMEOVER;
   }
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
      if (asteroidList[i].posY < -(asteroidList[i].height) ||
          asteroidList[i].posY > BG_HEIGHT + asteroidList[i].height ||
          asteroidList[i].posX < -(asteroidList[i].width) ||
          asteroidList[i].posX > BG_WIDTH + asteroidList[i].width)
      {
         asteroidList.splice(i--, 1);
         break;
      }
      asteroidList[i].update(delta);
   }
   movePlayer(delta);
   ship.update(delta);
   
   bulletCollision();
   shipCollision();
   
   difficulty += ship.speed;
   gunCD -= 8 * magic;
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
   //ctx.drawImage(boundBar, 0, BG_HEIGHT - SHIP_HEIGHT * INTERNAL_GRID);
}

function movePlayer(delta)
{
   /* Left thrust shoots left, moves RIGHT
   right thrust shoots right, move LEFT */
   var lThrust = ship.leftThrust * magic + 1;
   var rThrust = ship.rightThrust * magic + 1;
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
      // Use for Mouse
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      
      
      //mouseX = e.touches[0].screenX - 8;
      //mouseY = e.touches[0].screenY - 8;

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
   if (gunCD < 0)
   {
      if (ship.energy >= 10 && ship.listWeaps.length)
      {
         for (var k = 0; k < ship.listWeaps.length; k++)
         {

            playSFX(LASER);
            var ang = Math.atan2(mouseY + (BULLET_SIZE / 2) - INTERNAL_GRID/2 - ship.listWeaps[k].y * INTERNAL_GRID - ship.y, mouseX + (BULLET_SIZE / 2) - INTERNAL_GRID/2 - ship.x - ship.listWeaps[k].x * INTERNAL_GRID);
            var vx = Math.cos(ang) * BULLET_VEL;
            var vy = Math.sin(ang) * BULLET_VEL;
            
            
            bulletList.push(new Bullet(ship.x + ship.listWeaps[k].x * INTERNAL_GRID, ship.y + ship.listWeaps[k].y * INTERNAL_GRID, vx, vy));
            gunCD = 40;
         }
         ship.energy -= 10;
      }
   }
}

function spawnAsteroid()
{
   if (Math.random() < 0.00001 * difficulty)
   {
      var astSize = Math.random() * 2;
      var astPosX = Math.random() * (BG_WIDTH - astSize) + astSize;
      var astVelX = Math.random() * (2) - 1;
      var astVelY = difficulty * 0.001 + Math.random() * 4;
      
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

function shipCollision()
{
   var a = asteroidList.length;
   
   while (a--)
   {
      if (asteroidList[a].posX > ship.x - asteroidList[a].width &&
          asteroidList[a].posX < ship.x + SHIP_WIDTH * INTERNAL_GRID &&
          asteroidList[a].posY > ship.y - asteroidList[a].height &&
          asteroidList[a].posY < ship.y + SHIP_HEIGHT * INTERNAL_GRID)
      {
         var isHitT = ship.damage(asteroidList[a].posX + asteroidList[a].width/2 - ship.x,
                     asteroidList[a].posY - ship.y);
         var isHitB = ship.damage(asteroidList[a].posX + asteroidList[a].width/2 - ship.x,
                     asteroidList[a].posY + asteroidList[a].height - ship.y);
         var isHitL = ship.damage(asteroidList[a].posX - ship.x,
                     asteroidList[a].posY + asteroidList[a].height/2 - ship.y);
         var isHitR = ship.damage(asteroidList[a].posX + asteroidList[a].width - ship.x,
                     asteroidList[a].posY + asteroidList[a].height/2 - ship.y);
         
         if (isHitT || isHitB ||
             isHitL || isHitR)
         {
            asteroidList[a].health = 0;
         }
      }
   }
}