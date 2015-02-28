var bgArray = [Hustle, RoboWestern, OutlawLand];
var sfxArray = [, laser];
var clangs = [new Audio("assets/sounds/clang1.wav"), new Audio("assets/sounds/clang2.wav"), new Audio("assets/sounds/clang3.wav")];

var numSfx = 2;
var curBG = 0;
var numBG = 3;

var METAL = 0, LASER = 1;

function switchBackground (bg) {
	bgArray[curBG].pause();
	bgArray[curBG].currentTime = 0;

	bgArray[bg%numBG].play();
	curBG = bg%numBG;

	return curBG;
}

function playSFX(sfx) {
	if (sfx == 0) {
		clangs[Math.floor(Math.random() * 3) + 1].play();
	} else {
		sfxArray[sfx%sfxArray.length].play();
	}
}