//Image section
var player = new Image(); // you probably want to rename this.
player.src = "assets/tempPlayer.png";

var bulletImage = new Image();
bulletImage.src = "assets/bullet.png"

var testTileImage = new Image();
testTileImage.src = "assets/bootifulart.png";

var hull4 = new Image();
hull4.src = "assets/4pipe.png";

var test1TileImage = new Image();
test1TileImage.src = "assets/bootiful1.png";

var test2TileImage = new Image();
test2TileImage.src = "assets/bootiful2.png";

var test3TileImage = new Image();
test3TileImage.src = "assets/bootiful3.png";

var lHull1 = new Image();
lHull1.src = "assets/tileL1.png";
var lHull2 = new Image();
lHull2.src = "assets/tileL2.png";
var lHull3 = new Image();
lHull3.src = "assets/tileL3.png";
var lHull4 = new Image();
lHull4.src = "assets/tileL4.png";

var tHull1 = new Image();
tHull1.src = "assets/tileT1.png";
var tHull2 = new Image();
tHull2.src = "assets/tileT2.png";
var tHull3 = new Image();
tHull3.src = "assets/tileT3.png";
var tHull4 = new Image();
tHull4.src = "assets/tileT4.png";

var testGunTileImage = new Image();
testGunTileImage.src = "assets/goon.png";

var gridImage = new Image();
gridImage.src = "assets/gridsquare.png";

var newTileButtonImage = new Image();
newTileButtonImage.src = "assets/tilebutton.png";

var newShipButtonImage = new Image();
newShipButtonImage.src = "assets/shipbutton.png";

var trashImage1 = new Image();
trashImage1.src = "assets/trashsmall1.png";
var trashImage2 = new Image();
trashImage2.src = "assets/trashsmall2.png";
var trashImage3 = new Image();
trashImage3.src = "assets/trashsmall3.png";

var mainMenuImage = new Image();
mainMenuImage.src = "assets/MenuScreen.png";

var shopMenuImage = new Image();
shopMenuImage.src = "assets/ShopMenu.png";

//background music section
var Hustle = new Audio("assets/sounds/Hustle.wav");
Hustle.loop = true;
var RoboWestern = new Audio("assets/sounds/Robo-Western.wav");
RoboWestern.loop = true;
var OutlawLand = new Audio("assets/sounds/584409_Outlaw-Land.wav");
OutlawLand.loop = true;
//Sound effects section
var error = new Audio("assets/sounds/error.wav");
var trash = new Audio("assets/sounds/fireball.wav");
var laser = new Audio("assets/sounds/Gun_Shot-Marvin-1140816320.wav");
var clangs = [new Audio("assets/sounds/clang1.wav"), new Audio("assets/sounds/clang2.wav"), new Audio("assets/sounds/clang3.wav")];
