// ==UserScript==
// @name        ScratchPad Screen Shortcuts
// @namespace   StansScripts
// @description Shortcut key for save on Scratch pad (Alt-z) 
// @include   *scratch/index.jsp
// @version    15.1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

(function() {
    document.addEventListener('keydown', function(e) {

        //alert(e.keyCode)

        if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) { //alt-z

            $('#savebutton').click()
            unsafeWindow.checkScratch()
          
            setTimeout(function() {
                alert("Saved")
                window.close()
            }, 300);
        }
    }, false);
})();
