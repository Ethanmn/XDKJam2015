addEventListener("mousedown", menuMouseDownEvent);
var menuDraw = function(ctx) {
   if (muted == 0)
      ctx.drawImage(mainMenuImage, 0, 0);
   else 
      ctx.drawImage(mainMenuImageMuted, 0, 0)
}

function menuMouseDownEvent(e) {
   if (state == MENU) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      console.log("click get: ("+ mouseX +", " + mouseY + ")");
      if (mouseX > 112 && mouseX < 240 && mouseY > 64 && mouseY < 112) {
         state = BUILD;
         startBuilder();
      } else if (mouseX > 300 && mouseX < 350 && mouseY > 430 && mouseY < 480) {
         muteBackGround();
      }
   }
}