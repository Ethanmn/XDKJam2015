var BULLET_VEL = 10;
var BULLET_SIZE = 6;
var BULLET_COST = 10;

var Bullet = function(px, py, vx, vy)
{
   this.init = function(px, py, vx, vy)
   {
      this.width = BULLET_SIZE;
      this.height = BULLET_SIZE;
      this.posX = px;
      this.posY = py;
      this.velX = vx;
      this.velY = vy;
   };
   this.init(px, py, vx, vy);
   
   this.update = function(delta)
   {
      this.posX += this.velX * magic;
      this.posY += this.velY * magic;
   };
   
   this.draw = function(ctx)
   {
      ctx.drawImage(bulletImage, this.posX, this.posY);
   };
};