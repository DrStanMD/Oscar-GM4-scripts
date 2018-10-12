// ==UserScript==
// @name        MeasurementPrint
// @namespace   StansScripts
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @description Print button, Alt-s,Highlight RBS, Doubleclick for date
// @include    *oscarEncounter/oscarMeasurements/SetupMeasurements.do*
// @include        *oscarEncounter/GraphMeasurements.do?demographic_no*
// @version 15.1
// ==/UserScript==
var elements = (window.location.href)
//alert(elements)
var y = elements.indexOf('CDM'); 
//for the measurement screen title
//alert(y)
if (y > - 1) {
  $('input[name=\'value(inputValue-33)\']').css('background-color', 'yellow');
  $('input[name=\'value(inputValue-33)\']').focus()
}
var input = document.createElement('input');
input.type = 'button';
input.value = 'Print';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:absolute;top:220px;right:40px;');
document.body.appendChild(input);
function showAlert()
{
  window.print();
}
window.addEventListener('keypress', function (theEvent) {
  //theEvent.stopPropagation();
  //theEvent.preventDefault();
  var theKeyCode = theEvent.charCode; // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  //var theDownKey= theEvent.PgDnKey;
  switch (true) {
    case theAltKey && theKey == 's': //submit
      //alert("hi")
      return check()
      break;
      /*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
  }
},
true);
