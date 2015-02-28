addEventListener("mousedown", storeMouseDownEvent);
var TEN_SEC_PRICE = 1000;
var storeDraw = function(ctx) {
   ctx.drawImage(shopMenuImage, 0, 0);
   ctx.fillStyle = '#0000ff';
   ctx.font = "40px Calibri"
   ctx.fillText("Credits: " + money, 100, 60);
}

function storeMouseDownEvent(e) {
   if (state == STORE) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
      if (mouseX > 64 && mouseX < 96 && mouseY > 64 && mouseY < 96) {
         if (money >= 1000) {
            buildTimerMax += 10000;
            money -= 1000;
         }
      }
      if (mouseX > 160 && mouseX < 250 && mouseY > 352 && mouseY < 377) {
         /*
         state = BUILD;
         startBuilder();
         */
         state = SHOOT;
         loadShooter();
      }
   }
}