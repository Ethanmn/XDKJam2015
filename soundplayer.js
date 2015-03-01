var bgArray = [Hustle, RoboWestern, OutlawLand];
var sfxArray = [, laser, trash, error, boomSound];

var curSfx = 0, curBG = 1;
var METAL = 0, LASER = 1, TRASH = 2, ERROR = 3, BOOM = 4;

var muted = 1.0;

var clangNum = 0;

function muteBackGround () {
	muted = (muted + 1)%2;
	for (var i = bgArray.length - 1; i >= 0; i--) {
		bgArray[i].volume = muted;
	}
}

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
	if (curSfx != BOOM) {
		if (curSfx > 0) {
			sfxArray[curSfx].pause();
			sfxArray[curSfx].currentTime = 0;
		} else {
			clangs[clangNum].pause();
			clangs[clangNum].currentTime = 0;
		}
	}

	if (sfx == 0) {
		clangNum = Math.floor(Math.random() * clangs.length);
		clangs[clangNum].play();
		curSfx = 0;
	} else if (sfx%sfxArray.length == BOOM) {
		sfxArray[BOOM].currentTime = 0;
		sfxArray[BOOM].play();
		curSfx = sfx%sfxArray.length;
	} else {
		sfxArray[sfx%sfxArray.length].play();
		curSfx = sfx%sfxArray.length;
	}
}