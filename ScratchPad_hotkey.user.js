// ==UserScript==
// @name        ScratchPad Screen Shortcuts
// @namespace   StansScripts
// @description Shortcut key for save on Scratch pad (Alt-s) 
// @include   *scratch/index.jsp
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
vPath = ("https://" + location.host + "/" + firstElement)

window.addEventListener('keypress', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	var theKeyCode = theEvent.charCode;// || event.which;
	var theKey = String.fromCharCode(theKeyCode);
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	//var theDownKey= theEvent.PgDnKey;

	
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = yyyy+'-'+mm+'-'+dd;

	
	switch(true){
		
		case theAltKey && theKey=='s': //
			$('#savebutton').click()
			window.close()
			break;

		case theAltKey && theKey=='c': //
			//$('#thetext').val(today)
			break;
		
			
		/*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);