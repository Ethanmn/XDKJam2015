//Image section
var player = new Image(); // you probably want to rename this.
player.src = "assets/tempPlayer.png";

var bulletImage = new Image();
bulletImage.src = "assets/bullet.png"

var testTileImage = new Image();
testTileImage.src = "assets/bootifulart.png";

var test1TileImage = new Image();
test1TileImage.src = "assets/bootiful1.png";

var test2TileImage = new Image();
test2TileImage.src = "assets/bootiful2.png";

var test3TileImage = new Image();
test3TileImage.src = "assets/bootiful3.png";

var testGunTileImage = new Image();
testGunTileImage.src = "assets/goon.png";

var gridImage = new Image();
gridImage.src = "assets/gridsquare.png";

var newTileButtonImage = new Image();
newTileButtonImage.src = "assets/tilebutton.png";

var newShipButtonImage = new Image();
newShipButtonImage.src = "assets/shipbutton.png";

var trashImage = new Image();
trashImage.src = "assets/trash.png";

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