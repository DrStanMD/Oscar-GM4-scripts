// ==UserScript==
// @name        Preventions Screen Shortcuts
// @namespace   StansScripts
// @description Shortcut key for save on Prevention screen (Alt-s), alpha sort
// @include     *oscarPrevention/AddPreventionData.jsp?prevention*
// @include     *oscarPrevention/index.jsp?demographic_no*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.hostname + '/' + firstElement)
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
    case theAltKey && theKey == 's': //Add medications
      $('.MainTableRightColumn > form:nth-child(1) > input:nth-child(7)').click()
      break;
      /*
		case theAltKey && theCtrlKey && theShiftKey && theKey=='':
			//TO DO: The action to be performed for the above keyboard shortcut
			break;
		*/
  }
},
true);
//****************************************************************************
//=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
//$('#enclosingCol0 > input:nth-child(1)') .val(params.demographic_no)
//******************************************************************************
//$('.MainTableLeftColumn') .append('<td>Favorites List - for future use</td>');

d = $('.leftBox').html()
var parts = d.split('</li>');
//alert(parts)
var myArray = [
];
for (ii = 0; ii < parts.length; ii++) {
  for (i = 0; i < parts[ii].length; i++) {
//    alert(parts[i])
    if (!isNaN(parts[ii].charAt(i))) {
      if (parts[ii].charAt(i + 2) == '>') {
        searchstring = parts[ii].charAt(i + 3) + parts[ii].charAt(i + 4) + parts[ii].charAt(i + 5) + parts[ii].charAt(i + 6) + parts[ii].charAt(i + 7) + parts[ii].charAt(i + 8) + parts[ii].charAt(i + 9)
        myArray[ii] = searchstring + parts[ii]
      }
    }
  }
}
//alert(myArray)
myArray.sort()
myNewArray = [
]
for (i = 0; i < myArray.length - 1; i++) {
  myNewArray[i] = myArray[i]
  startat = (myNewArray[i].indexOf('<a'))
  myNewArray[i] = myNewArray[i].substring(startat)
}
newlist = '<br><a href=' + vPath + 'oscarReport/reportByTemplate/addEditTemplate.jsp style=\'color: #226d55; font-size: 10px;\'>Add Template</a><br>'
//newlist=""
for (var i = 0; i < myNewArray.length; i++) {
  //**************************************
  //**************NUMBERED LIST:
  newlist = newlist + '<br>' + (i + 1) + '. ' + myNewArray[i]
  //*************WITHOUT NUMBERS
  //newlist = newlist + "<br>"+myNewArray[i]
}
//**********REMOVE EXISTING LIST:

$('div.templatelist').html('<a href=' + vPath + 'oscarReport/reportByTemplate/addEditTemplate.jsp style=\'color: #226d55; font-size: 10px;\'>Add Template</a><br>')
//**********APPPEND TO BOTTOM:
$('.MainTableBottomRowRightColumn').html(newlist)
//*********REPLACE EXISTING LIST:
//$('div.templatelist') .html(newlist)
