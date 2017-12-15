// ==UserScript==
// @name        Split Screen to Full window
// @namespace   Stanscript
// @description Opens split screen to full screen size
// @include     */oscarMDS/Split.jsp?document=*
// @version     1
// @grant       none
// ==/UserScript==
window.onload = maxWindow;
function maxWindow() {
  window.moveTo(0, 0);
  if (document.all) {
    top.window.resizeTo(screen.availWidth, screen.availHeight);
  } 
  else if (document.layers || document.getElementById) {
    if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
      top.window.outerHeight = screen.availHeight;
      top.window.outerWidth = screen.availWidth;
    }
  }
}
