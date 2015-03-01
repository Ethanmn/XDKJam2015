//addEventListener("mousedown", menuMouseDownEvent);
addEventListener("touchstart", menuMouseDownEvent);
var menuDraw = function(ctx) {
   if (muted == 0)
      ctx.drawImage(mainMenuImage, 0, 0);
   else 
      ctx.drawImage(mainMenuImageMuted, 0, 0)
}

var creditDraw = function(ctx) {
   ctx.drawImage(creditMenu, 0, 0);
}
var tutorial1Draw = function(ctx) {
   ctx.drawImage(tut1Menu, 0, 0);
}
var tutorial2Draw = function(ctx) {
   ctx.drawImage(tut2Menu, 0, 0);
}
var gameOverDraw = function(ctx) {
   ctx.drawImage(gameOverMenu, 0, 0);
}

function menuMouseDownEvent(e) {
   mouseX = e.offsetX;
   mouseY = e.offsetY;
   if (state == MENU) {
      // use for mouse
      //mouseX = e.offsetX;
      //mouseY = e.offsetY;
      //use for touch
      mouseX = e.screenX + 8;
      mouseY = e.screenY + 8;
      //console.log("click get: ("+ mouseX +", " + mouseY + ")");
      if (mouseX > 112 && mouseX < 240 && mouseY > 150 && mouseY < 230) {
         state = BUILD;
         startBuilder();
      } else if (mouseX > 300 && mouseX < 350 && mouseY > 430 && mouseY < 480) {
         muteBackGround();
      } else if (mouseX > 112 && mouseX < 240 && mouseY > 250 && mouseY < 300) {
         state = TUTORIAL1;
      } else if (mouseX > 112 && mouseX < 240 && mouseY > 350 && mouseY < 400) {
         state = CREDITS;
      }
   }
   else if (state == CREDITS) {
      state = MENU;
   }
   else if (state == GAMEOVER) {
      if (mouseY > 350) {
         state = MENU;
      }
   }
   else if (state == TUTORIAL1) {
      console.log(e);
      if (mouseX > 30 && mouseX < 150 && mouseY > 420) {
         state = MENU;
      }
      if (mouseX > 225 && mouseY > 420) {
         state = TUTORIAL2;
      }
   }
   else if (state == TUTORIAL2) {
      console.log(e);
      if (mouseX > 30 && mouseX < 150 && mouseY > 420) {
         state = TUTORIAL1;
      }
      if (mouseX > 225 && mouseY > 420) {
         state = MENU;
      }
   }
}