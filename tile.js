var UP = 0;
var DOWN = 2;
var RIGHT = 1;
var LEFT = 3;

var HULL = 0;
var COCKPIT = 1;
var ENGINE_DOWN = 2;
var REACTOR = 3;
var GUN = 4;
var ENGINE_LEFT = 5;
var ENGINE_RIGHT = 6;

var Tile = function(image, x, y, directions, type) {
   this.init = function(image, x, y) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.directions = directions;
      this.selected = false;
      this.xoff = 0;
      this.yoff = 0;
      this.moveable = true;
      this.type = type;
      this.xPrev = 0;
      this.yPrev = 0;
   }
   this.init(image, x, y, directions, type);
   
   this.checkCollide = function(checkX, checkY) {
      if (this.x <= checkX && this.x + GRID >= checkX &&
         this.y <= checkY && this.y + GRID >= checkY) {
         this.xoff = checkX - this.x;
         this.yoff = checkY - this.y;
         return true;
      }
      return false;
   }
   
   this.checkFollow = function() {
      if (this.selected && this.moveable) {
         this.x = mouseX - this.xoff;
         this.y = mouseY - this.yoff;
      }
   }
   
   this.snap = function() {
      this.x = Math.floor((this.x + GRID/2)/GRID) * GRID;
      this.y = Math.floor((this.y + GRID/2)/GRID) * GRID;
   }
   
   this.draw = function(ctx) {
      ctx.drawImage(this.image, this.x, this.y);
   }
   
   this.checkPlacementLegality = function() {
      if (!this.moveable) { //has already passed this before
         return true;
      }
      //bounds check
      if (this.x < GRIDOFFX * GRID || this.x >= (GRIDOFFX + GRIDW) * GRID ||
         this.y < GRIDOFFY * GRID || this.y >= (GRIDOFFY + GRIDH) * GRID) {
         console.log("invalid: oob");
         return false; //oob
      }
      var connected = false;
      var other;
      for (var j = 0; j < tiles.length; j++) {
         other = tiles[j];
         if (!other.moveable) { //means the other has already been placed before. Also is not itself.
            //if in the same position
            if (other.x == this.x && other.y == this.y) {
               console.log("invalid: tile already there");
               return false;
            }
            // if the other is below and one piece doesn't allow hookups
            if (other.x == this.x && other.y - GRID == this.y && 
               ((!this.directions[DOWN] && other.directions[UP]) || (this.directions[DOWN] && !other.directions[UP]))) {
               console.log("invalid: tile below");
               return false;
            }
            // if the other is above and one piece doesn't allow hookups
            if (other.x == this.x && other.y + GRID == this.y && 
               ((!this.directions[UP] && other.directions[DOWN]) || (this.directions[UP] && !other.directions[DOWN]))) {
               //console.log("invalid: tile above");
               return false;
            }
            // if the other is left and one piece doesn't allow hookups
            if (other.x + GRID == this.x && other.y == this.y && 
               ((!this.directions[LEFT] && other.directions[RIGHT]) || (this.directions[LEFT] && !other.directions[RIGHT]))) {

               //console.log("invalid: tile left");
               return false;
            }
            // if the other is right and one piece doesn't allow hookups
            if (other.x - GRID == this.x && other.y == this.y && 
               ((!this.directions[RIGHT] && other.directions[LEFT]) || (this.directions[RIGHT] && !other.directions[LEFT]))) {
               console.log("invalid: tile right");
               return false;
            }
            if (other.x - GRID == this.x && other.y == this.y && other.directions[LEFT] && this.directions[RIGHT] || 
               other.x + GRID == this.x && other.y == this.y && other.directions[RIGHT] && this.directions[LEFT] ||
               other.y - GRID == this.y && other.x == this.x && other.directions[UP] && this.directions[DOWN] ||
               other.y + GRID == this.y && other.x == this.x && other.directions[DOWN] && this.directions[UP]) {
                  //console.log("is next to another block.");
                  connected = true; //the block must be connected
            }
         }
      }
      
      return connected;
   }
}