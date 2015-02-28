var bgArray = [Hustle, RoboWestern, OutlawLand];
var sfxArray = [, laser, trash, error];

var curSfx = 0, curBG = 1;
var METAL = 0, LASER = 1, TRASH = 2, ERROR = 3;

var clangNum = 0;

function switchBackground (bg) {
	if (curBG != bg) {
		bgArray[curBG].pause();
		bgArray[curBG].currentTime = 0;

		bgArray[bg%bgArray.length].play();
		curBG = bg%bgArray.length;
	}

	return curBG;
}

function playSFX(sfx) {
	if (curSfx > 0) {
		sfxArray[curSfx].pause();
		sfxArray[curSfx].currentTime = 0;
	} else {
		clangs[clangNum].pause();
		clangs[clangNum].currentTime = 0;
	}

	if (sfx == 0) {
		clangNum = Math.floor(Math.random() * clangs.length);
		clangs[clangNum].play();
		curSfx = 0;
	} else {
		sfxArray[sfx%sfxArray.length].play();
		curSfx = sfx%sfxArray.length;
	}
}