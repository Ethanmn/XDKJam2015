var BULLET_VEL = 10;
var BULLET_SIZE = 7;

var Bullet = function(px, py, vx, vy)
{
   this.init = function(px, py, vx, vy)
   {
      this.posX = px;
      this.posY = py;
      this.velX = vx;
      this.velY = vy;
   }
   this.init(px, py, vx, vy);
   
   this.update = function(delta)
   {
      
      this.posX += this.velX * magic;
      this.posY += this.velY * magic;
      
      //console.log("px " + this.posX + " py " + this.posY);
      // Add collisions here
   }
   
   this.draw = function(ctx)
   {
      ctx.drawImage(bulletImage, this.posX, this.posY);
   }
}