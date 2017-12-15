// ==UserScript==
// @name        Household Linker and Appt mover
// @namespace   DavidScripts
// @description Simplifies switching to family charts and moving appt around
// @include     */casemgmt/forward.jsp?action=view&demographicNo=*
// @include    */demographic/demographiccontrol.jsp?demographic_no=*
// @include     */appointment/addappointment.jsp?provider_no=*
// @include     */appointment/appointmentcontrol.jsp?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     2
// @grant       none
// ==/UserScript==

window.addEventListener("load",function(){
// This splits off the addition to the URL and conveniently assigns it to QueryString for easy retrieval
var QueryString = function () { 
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
    return query_string;
}();

//This splits off the web page details and combines them so that you can determine what page you are on
 var element1 = (window.location.pathname.split('/'))[2];
 var element2 = (window.location.pathname.split('/'))[3];
 var locator = element1.concat(element2);
 
if (locator == 'casemgmtforward.jsp'){    //We are in the Encounter Page
var theTarget = document.getElementById("header");
var linkButton=document.createElement("input");
linkButton.type="button";
linkButton.value="Family Links";
linkButton.onclick = doLink;
linkButton.setAttribute('style', 'font-size:9px;position:absolute;top:0px;right:430px;background-color: #00FF00');
document.body.appendChild(linkButton);

var theTarget2 = document.getElementById("header");
var linkButton2=document.createElement("input");
linkButton2.type="button";
linkButton2.value="Appt";
linkButton2.onclick = storeName;
linkButton2.setAttribute('style', 'font-size:9px;position:absolute;top:0px;right:380px;background-color: #00FF00');
document.body.appendChild(linkButton2);
}
function doLink() {
		var elements = (window.location.pathname.split('/', 2));
		firstElement = (elements.slice(1) );
		var vPath = ("https://" + location.host + "/" +firstElement);
		var linkPath = vPath+"/demographic/demographiccontrol.jsp?demographic_no="+demographicNo+"&displaymode=edit&dboperation=search_detail&z=1";
		var linkWindow = window.open(linkPath);
		window.close();
	}
function storeName() {
var myDemo = window.location.href.split('&demographicNo=')[1];
var myDemoNo = myDemo.split('&')[0];  //This returns the patients demographic number
localStorage.setItem('ptDemoNo', myDemoNo);  //stores this in local storage
}
		

if (locator == 'demographicdemographiccontrol.jsp'){    //We are in the Master Demographic Page
if (QueryString.z == 1){  //This will only activate if the request started from the Family Link button
var address = $('#editDemographic > tbody:nth-child(1) > tr:nth-child(4)>td:nth-child(2) > input:nth-child(1)').val();
$('input[name=keyword]').val(address);
$("select[name=search_mode]").val('search_address');
$('input[title="Search active patients"]').click(); 
}

if (QueryString.z == 2){  //This is just an extra that allows RBT to link straight to the encounter without stopping at Master Demographics
$('a[title="E-Chart"]').click();
window.close();
}
}


if ((locator == 'appointmentaddappointment.jsp') || (locator == 'appointmentappointmentcontrol.jsp')) {    //We are in the Appointment Popup Page
Patient = localStorage.getItem('ptDemoNo');
if (Patient){                //Only proceeds if not null. If nothing on the clipboard then behaves normally
$('input[name=demographic_no]').val(Patient); //The appointment is made with the demographic number which is the best approach
	$('#addButton').click();
localStorage.clear();       //This empties the clipboard so that it does not activate again
}

	// This is the code that moves the appt around	 
        var appStatus = 0;
		var determinator = 0;
		determinator = localStorage.getItem('copyPaste');
		if (determinator == 1) {  //This means there is something in the clipboard from Appt Cut or Copy
		   appType = localStorage.getItem('appStatus');
		   $("select[name='status']").val(appType);
		   $("#pasteButton").click();
		   $("#addButton").click();
		   localStorage.clear();  //This empties the clipboard so that it does not activate again
		   }
		     
        document.onkeydown = testKeyEvent;
		//document.onkeypress = testKeyEvent;
        //document.onkeyup = testKeyEvent;
    }
	
	function testKeyEvent(e) {
        if (e.keyCode == 17) {  //this means Ctrl is pushed
		   localStorage.setItem('copyPaste', "1");  //this passes the information that there is something in the clipboard
		   Status =$("select[name='status']").val();
		   localStorage.setItem('appStatus', Status);
		   $("input[value='Cut']").click();  //this uses OSCAR appt Cut
           }
		if (e.keyCode == 18) {  //this means Alt is pushed
		   localStorage.setItem('copyPaste', "1");
		   Status =$("select[name='status']").val();
		   localStorage.setItem('appStatus', Status);
		   $("input[value='Copy']").click();  //this uses OSCAR appt Paste
		   }
        }

}, false);