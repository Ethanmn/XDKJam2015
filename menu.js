addEventListener("mousedown", menuMouseDownEvent);
var menuDraw = function(ctx) {
   if (state == MENU) {
      ctx.drawImage(mainMenuImage, 0, 0);
   }
}

function menuMouseDownEvent(e) {
   if (state == MENU) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      console.log("click get");
      if (mouseX > 112 && mouseX < 240 && mouseY > 64 && mouseY < 112) {
         state = BUILD;
         startBuilder();
      }
   }
}