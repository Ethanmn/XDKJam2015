addEventListener("mousedown", builderMouseDownEvent);
addEventListener("mousemove", builderMouseHoldEvent);
addEventListener("mouseup", builderMouseUpEvent);


//var TESTON = true;


var GRID = 32; //size of a grid square
var GRIDOFFX = 3;
var GRIDOFFY = 2;
var GRIDW = 5;
var GRIDH = 9;


var newTileButtonX = GRID * 3;
var newTileButtonY = GRID * 1;
var newTileButtonW = 128;
var newTileButtonH = 32;

var trashX = 7 * GRID;
var trashY = 13 * GRID;
var trashW = 64;
var trashH = 64;

var newShipButtonX = GRID * 3;
var newShipButtonY = GRID * 12;
var newShipButtonW = 32;
var newShipButtonH = 32;

var burn = 0;

var tiles = [];
var startTile;

/*
tiles.push(new Tile(test1TileImage, 0, 0, [false, true, false, false], HULL));
tiles.push(new Tile(test1TileImage, 0, 32, [false, true, false, false], HULL));
tiles.push(new Tile(test2TileImage, 32, 0, [false, true, false, true], HULL));
tiles.push(new Tile(test2TileImage, 64, 0, [false, true, false, true], HULL));
tiles.push(new Tile(test2TileImage, 32, 32, [false, true, false, true], HULL));
tiles.push(new Tile(test2TileImage, 64, 32, [false, true, false, true], HULL));
tiles.push(new Tile(test3TileImage, 96, 32, [false, true, true, true], HULL));
tiles.push(new Tile(test3TileImage, 128, 32, [false, true, true, true], HULL));
*/
var buildTimerMax = 30000;
var buildTimer = 0;
var timerOn = false;

var startBuilder = function() {
   tiles = [];
   startTile = new Tile(cockpitImage, GRID * 5, GRID * 6, [true, true, true, true], COCKPIT);
   startTile.moveable = false;
   tiles.push(startTile);
   buildTimer = buildTimerMax;
   timerOn = true;
   generateTile();
}

function builderUpdate(delta) {
   if (mouseDown) {
      for (var i = 0; i < tiles.length; i++) {
         tiles[i].checkFollow();
      }
   }
   buildTimer -= delta;
   if (buildTimer < 0 && timerOn) {
      console.log("timer expired");
      ship = exportShip();
      timerOn = false;
      state = SHOOT;
      loadShooter();
   }
   if (burn > 0) {
      console.log(burn);
      burn--;
   }
}

function builderDraw() {
   //if(TESTON){ //remove
   //DRAW THE GRID (bottom layer after background)
   for (var i = GRIDOFFX; i < GRIDOFFX + GRIDW; i++) {
      for (var j = GRIDOFFY; j < GRIDOFFY + GRIDH; j++) {
         ctx.drawImage(gridImage, i * GRID, j * GRID);
      }
   }
   
   //draw the timer
   if (buildTimer > 10000) {
      ctx.fillStyle = '#ffffff';
   }
   else if (buildTimer > 5000) {
      ctx.fillStyle = '#ff8080';
   }
   else if (buildTimer <= 5000) {
      ctx.fillStyle = '#ff0000';
   }
   ctx.font = "40px Calibri"
   ctx.fillText("Time Left: " + Math.floor(buildTimer/1000), 10, 50);

   ctx.drawImage(newShipButtonImage, newShipButtonX, newShipButtonY);
   if (burn < 5) {
      ctx.drawImage(trashImage1, trashX, trashY);
   }
   else if (burn < 300) {
      ctx.drawImage(trashImage2, trashX, trashY);
   }
   else {
      ctx.drawImage(trashImage3, trashX, trashY);
   }
   
   //DRAW ALL TILES
   for (var i = 0; i < tiles.length; i++) {
      tiles[i].draw(ctx);
   }
   /*} //remove
   else {
      //console.log("shipdraw");
      ctx.drawImage(newTileButtonImage, newTileButtonX, newTileButtonY);
      ship.draw(ctx);
   }*/
}

function builderMouseDownEvent(e){
   if (state == BUILD) {
      //console.log(e);
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      
      //checkDamage(); //button check: REMOVE ME WHEN SHOOTER IS UP TO DATE
      
      checkNewShip(); //button 2
      
      for (var i = 0; i < tiles.length; i++) {
         if(tiles[i].checkCollide(mouseX, mouseY) && tiles[i].moveable) {
            console.log("selected");
            tiles[i].selected = true;
            tiles[i].xPrev = tiles[i].x;
            tiles[i].yPrev = tiles[i].y;
            break;
         }
      }
      mouseDown = true;
   }
}
/*
function checkDamage() {
   if (newTileButtonX <= mouseX && newTileButtonX + newTileButtonW >= mouseX &&
      newTileButtonY <= mouseY && newTileButtonY + newTileButtonH >= mouseY) {
      //console.log("pressed the button");
      var dx = Math.random() * 80;
      var dy = Math.random() * 192;
      console.log("(" + dx+ ", "+dy+")");
      console.log(ship.damage(dx, dy));
   }
}*/

function builderMouseHoldEvent(e){
   if (state == BUILD) {
      if (mouseDown) {
         mouseX = e.offsetX;
         mouseY = e.offsetY;
         //console.log("mouse moved");
      }
   }
}

function builderMouseUpEvent(e) {
   var isTrash = 0; // used to make sure that the METAL sfx doesn't play when you put something in the trash

   if (state == BUILD) {
      for (var i = 0; i < tiles.length; i++) {
         if (tiles[i].selected) {
            console.log("deselecting");
            
            tiles[i].snap();
            if(tiles[i].x >= trashX && tiles[i].y >= trashY) {
               tiles.splice(i--, 1);
               playSFX(TRASH);
               burn += 200;
               isTrash++;
               
            }
            if(tiles[i].checkPlacementLegality()) {
               tiles[i].moveable = false;
               generateTile();
               
               if(isTrash == 0)
                  playSFX(METAL);
            }
            else {
               tiles[i].x = tiles[i].xPrev;
               tiles[i].y = tiles[i].yPrev;
               playSFX(ERROR);
            }
         }
         tiles[i].selected = false;
      }
      mouseDown = false;
   }
}



function generateTile() {
      //generate a tile here.
      var OPTIONS = 25;
      var rand = Math.floor(Math.random() * OPTIONS);
      //[up, left, down, right]
      switch (rand) {
         case 0:
            tiles.push(new Tile(hull4, GRID * 8, GRID * 1, [true, true, true, true], HULL));
            break;
         case 1:
            tiles.push(new Tile(hull4, GRID * 8, GRID * 1, [true, true, true, true], HULL));
            break;
         case 2:
            tiles.push(new Tile(lHull1, GRID * 8, GRID * 1, [true, true, false, false], HULL));
            break;
         case 3:
            tiles.push(new Tile(lHull2, GRID * 8, GRID * 1, [false, true, true, false], HULL));
            break;
         case 4:
            tiles.push(new Tile(lHull3, GRID * 8, GRID * 1, [false, false, true, true], HULL));
            break;
         case 5:
            tiles.push(new Tile(lHull4, GRID * 8, GRID * 1, [true, false, false, true], HULL));
            break;
         case 6:
            tiles.push(new Tile(tHull1, GRID * 8, GRID * 1, [false, true, true, true], HULL));
            break;
         case 7:
            tiles.push(new Tile(tHull2, GRID * 8, GRID * 1, [true, false, true, true], HULL));
            break;
         case 8:
            tiles.push(new Tile(tHull3, GRID * 8, GRID * 1, [true, true, false, true], HULL));
            break;
         case 9:
            tiles.push(new Tile(tHull4, GRID * 8, GRID * 1, [true, true, true, false], HULL));
            break;
         case 10:
            tiles.push(new Tile(gun1, GRID * 8, GRID * 1, [false, true, false, false], GUN));
            break;
         case 11:
            tiles.push(new Tile(gun2, GRID * 8, GRID * 1, [false, false, true, false], GUN));
            break;
         case 12:
            tiles.push(new Tile(gun3, GRID * 8, GRID * 1, [false, false, false, true], GUN));
            break;
         case 13:
            tiles.push(new Tile(gunT, GRID * 8, GRID * 1, [false, true, false, true], GUN));
            break;
         case 14:
            tiles.push(new Tile(react1, GRID * 8, GRID * 1, [false, true, true, true], REACTOR));
            break;
         case 15:
            tiles.push(new Tile(react2, GRID * 8, GRID * 1, [true, false, true, true], REACTOR));
            break;
         case 16:
            tiles.push(new Tile(react3, GRID * 8, GRID * 1, [true, true, false, true], REACTOR));
            break;
         case 17:
            tiles.push(new Tile(react4, GRID * 8, GRID * 1, [true, true, true, false], REACTOR));
            break;
         case 18:
            tiles.push(new Tile(engine1, GRID * 8, GRID * 1, [true, false, false, false], ENGINE_DOWN));
            break;
         case 19:
            tiles.push(new Tile(engine2, GRID * 8, GRID * 1, [false, true, false, true], ENGINE_DOWN));
            break;
         case 20:
            tiles.push(new Tile(engine3, GRID * 8, GRID * 1, [true, true, false, true], ENGINE_DOWN));
            break;
         case 21:
            tiles.push(new Tile(enginer1, GRID * 8, GRID * 1, [false, false, false, true], ENGINE_LEFT));
            break;
         case 22:
            tiles.push(new Tile(enginer2, GRID * 8, GRID * 1, [true, false, true, false], ENGINE_LEFT));
            break;
         case 23:
            tiles.push(new Tile(enginel1, GRID * 8, GRID * 1, [false, true, false, false], ENGINE_RIGHT));
            break;
         case 24:
            tiles.push(new Tile(enginel2, GRID * 8, GRID * 1, [true, false, true, false], ENGINE_RIGHT));
            break;
         default:
            break;
            
      }
}

function checkNewShip() {
   if (newShipButtonX <= mouseX && newShipButtonX + newShipButtonW >= mouseX &&
      newShipButtonY <= mouseY && newShipButtonY + newShipButtonH >= mouseY) {
      buildTimer = 0;
   }
}

function exportShip() {
   var lship = [];
   for (var i = 0; i < tiles.length; i++) {
      if (!tiles[i].moveable) {
         lship.push(tiles[i]);
      }
   }
   //TESTON = false;
   return new Ship(lship, 2, 4);
}