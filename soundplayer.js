var Hustle = new Audio("www/asset/sounds/Hustle.wav");
var RoboWestern = new Audio("www/asset/sounds/Robo-Western.wav");
var OutlawLand = new Audio("www/asset/sounds/584409_Outlaw-Land.wav");
var laser = new Audio("www/asset/sounds/Gun_Shot-Marvin-1140816320.wav");

var numSfx = 1;

function playSFX(sfx) {
	switch (sfx%numSfx) {
		case 0:
			laser.play();
			break;
	}
}