var delta = 20; // 50 FPS
var ctx;
function loadGame()
{
	ctx = document.getElementById("canvas").getContext('2d');
   gameLoop();
}

function gameLoop()
{
	update(delta);
	draw();

	window.setTimeout(gameLoop, delta);
}

function update(delta) {
   //do stuff here, happens every frame.
}

function draw()
{
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0, 500, 600);
	ctx.stroke();
}