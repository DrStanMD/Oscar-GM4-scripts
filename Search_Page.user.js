// ==UserScript==
// @name        Search Page

// @namespace   Stanscripts


// @description Clears search string on getfocus (you don't have to backspace to clear previous name). Alt-z shortcut to start over.
// @include     *demographic/search.jsp*

// @include     *demographic/demographiccontrol.jsp?search*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     1

// @grant       none

// ==/UserScript==

$('input.wideInput').click(function(){
 $('input.wideInput').css("background-color","yellow");
$('input.wideInput').val("");
 });


window.addEventListener('keypress', function(theEvent) {
	//theEvent.stopPropagation();
	//theEvent.preventDefault();
	var theKeyCode = theEvent.charCode;// || event.which;
	var theKey = String.fromCharCode(theKeyCode);
	var theAltKey =theEvent.altKey;
	var theCtrlKey = theEvent.ctrlKey;
	var theShiftKey= theEvent.shiftKey;
	//var theDownKey= theEvent.PgDnKey;

	switch(true){
		
			case theAltKey && theKey=='z': //submit
 			$('input.wideInput').css("background-color","yellow");
			$('input.wideInput').val("");
			$('input.wideInput').focus()                               
			break;

		/*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
	}
}, true);