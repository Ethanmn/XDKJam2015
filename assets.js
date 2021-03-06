//Image section
var player = new Image(); // you probably want to rename this.
player.src = "assets/tempPlayer.png";

var bulletImage = new Image();
bulletImage.src = "assets/bullet.png"

var asteroidImage = new Image();
asteroidImage.src = "assets/asteroid.png"

var boundBar = new Image();
boundBar.src = "assets/boundBar.png"

var engine1 = new Image();
engine1.src = "assets/engineEnd.png";
var engine2 = new Image();
engine2.src = "assets/engineLine.png";
var engine3 = new Image();
engine3.src = "assets/engineT.png";

var enginer1 = new Image();
enginer1.src = "assets/engineRight.png";
var enginer2 = new Image();
enginer2.src = "assets/engineLineRight.png";
var enginel1 = new Image();
enginel1.src = "assets/engineLeft.png";
var enginel2 = new Image();
enginel2.src = "assets/engineLineLeft.png";

var react1 = new Image();
react1.src = "assets/tileReactor1.png"
var react2 = new Image();
react2.src = "assets/tileReactor2.png"
var react3 = new Image();
react3.src = "assets/tileReactor3.png"
var react4 = new Image();
react4.src = "assets/tileReactor4.png"

var gun1 = new Image();
gun1.src = "assets/gunEdge1.png";
var gun2 = new Image();
gun2.src = "assets/gunEdge2.png";
var gun3 = new Image();
gun3.src = "assets/gunEdge3.png";
var gunT = new Image();
gunT.src = "assets/gunT.png";


var cockpitImage = new Image();
cockpitImage.src = "assets/cockpit.png";

var hull4 = new Image();
hull4.src = "assets/4pipe.png";

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
mainMenuImage.src = "assets/MenuScreen2.png";
var mainMenuImageMuted = new Image();
mainMenuImageMuted.src = "assets/MenuScreen2Muted.png";

var creditMenu = new Image();
creditMenu.src = "assets/creditScreen.png";
var gameOverMenu = new Image();
gameOverMenu.src = "assets/GameOver.png";
var tut1Menu = new Image();
tut1Menu.src = "assets/Tutorial1.png";
var tut2Menu = new Image();
tut2Menu.src = "assets/Tutorial2.png";

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
var boomSound = new Audio("assets/sounds/explosion.wav");
var clangs = [new Audio("assets/sounds/clang1.wav"), new Audio("assets/sounds/clang2.wav"), new Audio("assets/sounds/clang3.wav")];
