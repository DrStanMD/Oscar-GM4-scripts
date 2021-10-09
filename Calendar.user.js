// ==UserScript==
// @name     Calendar
// @include      *SetupMeasurements.do?groupName*
// @version  15.0

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require  calendar.js
// @require  calendar-en.js
// @require  calendar-setup.js
// @grant    GM_addStyle
// ==/UserScript==

//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ("href=&quote;https://" + location.host + "/" + firstElement + "/share/calendar/calendar.css&quote;")
//alert(vPath)

var elements = (window.location.href)
//alert(elements)
var y = elements.indexOf('Screening'); //for the measurement screen title
if (y > - 1) {

$('head').append('<link '
+ 'href="/share/calendar/calendar.css" '
//+ vPath                 
+ 'rel="stylesheet" type="text/css">'
);

$('input[name=\'value(inputValue-8)\']').css('background-color', 'pink');
$('input[name=\'value(inputValue-8)\']').attr("id","newId")

Calendar.setup( { inputField :"newId", ifFormat : "%Y-%m-%d", button : "newId" , singleClick:true, step:1 });
}
