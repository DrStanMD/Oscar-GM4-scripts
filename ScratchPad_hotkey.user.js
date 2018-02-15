// ==UserScript==
// @name        ScratchPad Screen Shortcuts
// @namespace   StansScripts
// @description Shortcut key for save on Scratch pad (Alt-s) 
// @include   *scratch/index.jsp
// @version     1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==


window.addEventListener('keypress', function (theEvent) {
  var theKeyCode = theEvent.charCode; // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  //var theDownKey= theEvent.PgDnKey;

  switch (true) {
    case theAltKey && theKey == 'z': 
    // $('#savebutton').click()
     unsafeWindow.checkScratch()
     //alert("Saved")
     setTimeout(function(){
     window.close()
               }, 300);
      break;
  }
},
true);
