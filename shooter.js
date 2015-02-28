function loadShooter()
{
   addEventListener("mousedown", shooterCheck, false);
}

function updateShooter(delta)
{
   
}

function drawPlayer()
{
   ship.draw();
}

function shooterCheck(e)
{
   if (e.offsetX < 121)
   {
      console.log("Move!");
   }
   console.log(e);
   ship.d
}