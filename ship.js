var INTERNAL_GRID = 16;
var SHIP_WIDTH = 5;
var SHIP_HEIGHT = 9;

var Ship = function(tiles, cx, cy) {

   this.init = function(tiles, cx, cy) {
      this.x = 0;
      this.y = 0;
      this.cx = cx;
      this.cy = cy;
      this.energy = 0;
      this.tiles = []; //converted tiles, don't call the older methods or else bad stuff happens.
      // this is totally not hacky. Totally.
      for (var i = 0; i < tiles.length; i++) {
         
         tiles[i].x = tiles[i].x / GRID - GRIDOFFX;
         tiles[i].y = tiles[i].y / GRID - GRIDOFFY;
      }
      this.tiles = tiles;
   }
   this.init(tiles, cx, cy)
   
   this.countComponents = function() {
      this.numWeaps = 0;
      this.reactors = 0;
      this.leftThrust = 0;
      this.rightThrust = 0;
      this.speed = 0;
      for (var i = 0; i < this.tiles.length; i++) {
         switch (this.tiles[i].type) {
            case(GUN) :
               this.numWeaps++;
               break;
            
            case(ENGINE_DOWN) :
               this.speed++;
               break;
            
            case(REACTOR) :
               this.reactors++;
               break;
            
            case(ENGINE_LEFT) :
               this.leftThrust++;
               break;
            
            case(ENGINE_RIGHT) :
               this.rightThrust++;
               break;
            default:
               break;
            
         }
      }
   }
   
   //x and y in this case are a relative x and y. 
   //Should be done with (whatever is hitting you).x - this.x, (whatever is hitting you).y - this.y
   //Can simply use a basic hitbox, this function returns true if something was actually hit, false
   //otherwise.
   this.damage = function(x, y) {
      var hitSustained = false;
      var newTiles = [];
      var tileX = Math.round(x / INTERNAL_GRID);
      var tileY = Math.round(y / INTERNAL_GRID);
      console.log("hit on " + tileX + ", " + tileY);
      //if hit on cockpit, gg.
      if (tileX == this.cx && tileY == this.cy) {
         this.tiles = newTiles;
         return true;
      }
      for (var i = 0; i < this.tiles.length; i++) {
         if (this.cx == this.tiles[i].x && this.cy == this.tiles[i].y) {
            console.log("added center to newTiles");
            newTiles.push(tiles[i]);
         }
         if (tileX == this.tiles[i].x && tileY == this.tiles[i].y) {
            console.log("a REAL HIT!");
            this.tiles.splice(i--, 1);
            hitSustained = true;
         }

      }
      
      //random function because javascript.
      var containsInNew = function(element) {
         for (var k = 0; k < newTiles.length; k++) {
            if (newTiles[k].x == element.x && newTiles[k].y == element.y) {
               //console.log("found it!");
               return true;
            }
         }
         //console.log("fail to find.");
         return false;
      }
      
      var i = 0;
      while (i < newTiles.length) {
         //console.log(i);
         for (var j = 0; j < this.tiles.length; j++) {
            if (!containsInNew(this.tiles[j])) {
               if (newTiles[i].directions[UP] && this.tiles[j].x == newTiles[i].x && this.tiles[j].y == newTiles[i].y - 1) {
                  console.log("attached above");
                  newTiles.push(this.tiles[j]);
               }
               if (newTiles[i].directions[DOWN] && this.tiles[j].x == newTiles[i].x && this.tiles[j].y == newTiles[i].y + 1) {
                  console.log("attached below");
                  newTiles.push(this.tiles[j]);
               }
               if (newTiles[i].directions[LEFT] && this.tiles[j].x == newTiles[i].x - 1 && this.tiles[j].y == newTiles[i].y) {
                  console.log("attached left");
                  newTiles.push(this.tiles[j]);
               }
               if (newTiles[i].directions[RIGHT] && this.tiles[j].x == newTiles[i].x + 1 && this.tiles[j].y == newTiles[i].y) {
                  console.log("attached right");
                  newTiles.push(this.tiles[j]);
               }
            }
         }
         i++;
      }
      if (hitSustained) {
         this.tiles = newTiles;
         this.countComponents();//recount
      }
      return hitSustained;
   }
   
   this.draw = function(ctx) {
      for (var i = 0; i < this.tiles.length; i++) {
         //ctx.drawImage(this.tiles[i].image, 0, 0);

         ctx.drawImage(this.tiles[i].image, this.x + (this.tiles[i].x * INTERNAL_GRID), this.y + (this.tiles[i].y * INTERNAL_GRID), INTERNAL_GRID, INTERNAL_GRID);
         //commented out is debug text, showing the coordinates on the ship.
         /*ctx.fillStyle = '#ff0000';
         ctx.font = "16px Calibri"
         ctx.fillText(this.tiles[i].x + " " + this.tiles[i].y, this.x + (this.tiles[i].x * INTERNAL_GRID), this.y + 16 + (this.tiles[i].y * INTERNAL_GRID));
         ctx.stroke();*/
         //this.tiles[i].shipDraw(ctx, this.x, this.y);
      }
   }
}