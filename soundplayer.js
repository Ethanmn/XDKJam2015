var Hustle = new Audio("www/asset/sounds/Hustle.wav");
var RoboWestern = new Audio("www/asset/sounds/Robo-Western.wav");
var OutlawLand = new Audio("www/asset/sounds/584409_Outlaw-Land.wav");
var laser = new Audio("www/asset/sounds/Gun_Shot-Marvin-1140816320.wav");

var bgArray = [Hustle, RoboWestern, OutlawLand];
var sfxArray = [laser];

var numSfx = 1;
var curBG = 0;
var numBG = 3;

function switchBackground (bg) {
	bgArray[curBG].pause();
	bgArray[curBG].currentTime = 0;

	bgArray[bg%numBG].play();
	curBG = bg%numBG;

	return curBG;
}

function playSFX(sfx) {
	sfxArray[sfx%numSfx];
}