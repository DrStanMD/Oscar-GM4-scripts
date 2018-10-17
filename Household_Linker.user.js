// ==UserScript==
// @name        Household Linker and Appt mover disabled
// @namespace   DavidScripts
// @description Simplifies switching to family charts and moving appt around
// @include     */casemgmt/forward.jsp?action=view&demographicNo=*
// @include    */demographic/demographiccontrol.jsp?demographic_no=*
// @include     */appointment/addappointment.jsp?provider_no=*
// @include     */appointment/appointmentcontrol.jsp?*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement)
var x = window.location.toString()//alert(x)
/*
if (x.indexOf('casemgmt/forward.jsp?action')>-1){    
//alert("We are in the Encounter Page")
var theTarget = document.getElementById("header");
var linkButton=document.createElement("input");
linkButton.type="button";
linkButton.value="Family Links";
linkButton.onclick = doLink;
linkButton.setAttribute('style', 'font-size:9px;position:absolute;top:0px;right:430px;background-color: #00FF00');
document.body.appendChild(linkButton);
}
*/
/*
if (x.indexOf('demographic/demographiccontrol.jsp') > - 1) {
  //alert("We are in the Master Demographic Page")
  var theTarget = document.getElementById('header');
  var linkButton = document.createElement('input');
  linkButton.type = 'button';
  linkButton.value = 'Family Links';
  linkButton.onclick = doLink;
  linkButton.setAttribute('style', 'font-size:9px;position:absolute;top:0px;right:430px;background-color: #00FF00');
  document.body.appendChild(linkButton);
}
function doLink() {
  var address = $('#contactInformation > ul:nth-child(2) > li:nth-child(5) > span:nth-child(2)').html();
  $('input[name=keyword]').val(address);
  $('select[name=search_mode]').val('search_address');
  $('input[title="Search active patients"]').click();
}
*/
/*
if (QueryString.z == 2){  //This is just an extra that allows RBT to link straight to the encounter without stopping at Master Demographics
$('a[title="E-Chart"]').click();
window.close();
}
}
*/
