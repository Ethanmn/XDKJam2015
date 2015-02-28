var Asteroid = function (px, py, vx, vy, size, health)
{
   this.init = function (px, py, vx, vy, size, health)
   {
      this.health = health;
      this.width = 16;
      this.height = 16;
      this.posX = px;
      this.posY = py;
      this.velX = vx;
      this.velY = vy;
      this.size = size;
   }
   this.init(px, py, vx, vy, size, health)
   
   this.update = function(delta)
   {
      if (!this.health)
      {
         for (var a = 0; a < asteroidList.length; a++)
         {
            if (asteroidList[a].posX == this.posX &&
                asteroidList[a].posY == this.posY)
            {
               asteroidList.splice(a, 1);
            }
         }
      }
      
      this.posX += this.velX * magic;
      this.posY += this.velY * magic;
   }
   
   this.draw = function(ctx)
   {
      ctx.drawImage(asteroidImage, this.posX, this.posY);
   }
}