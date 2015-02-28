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