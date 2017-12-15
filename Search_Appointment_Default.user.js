// ==UserScript==
// @name        Search Appointment Default

// @namespace   Stanscripts

// @description Sets defaults for search appointment.  Adds day of week to date
// @include     *appointment/appointmentsearch.jsp*

// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

testfor = ($('body > center:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)').html())
if (testfor == null)
{
var theDefault='1 - 15 Minute Appointment';
var theOptions = document.getElementsByName('code')[0].options;
for  (var theOption of theOptions)
{for (var i=0; i<3; i++) {}
//{for (var i=0; i<3; i++) {alert(theOption.text)}
	if(typeof(theOption)=='object'){
		if(theOption.text==theDefault){
			theOption.selected=true;
			break;
		}
	}
}

}


 $('body > form:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > select:nth-child(1)').css("background-color","yellow");

 var weekday = new Array(7);
 weekday[0]=  "Sun.";
 weekday[1] = "Mon.";
 weekday[2] = "Tue.";
 weekday[3] = "Wed.";
 weekday[4] = "Thu.";
 weekday[5] = "Fri.";
 weekday[6] = "Sat.";

for (var xx = 2; xx < 12; xx++) { 
var dow =  "$('body > center:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(" + xx + ") > td:nth-child(1)')"
obj = eval('{' + dow + '}');
d = new Date(obj.html())
//alert(d)
var n = weekday[d.getDay()+1]; 
//alert(n)
obj.append('_'+n)
}
