function loadShooter()
{
   addEventListener("mousedown", shooterCheck, false);
}

function updateShooter()
{
   
}

function drawPlayer()
{
   ctx.drawImage(player, 50, 50);
}

function shooterCheck(e)
{
   if (e.offsetX < 121)
   {
      console.log("Move!");
   }
   console.log(e);
}