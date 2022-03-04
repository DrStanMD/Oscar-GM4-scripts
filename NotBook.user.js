// ==UserScript==
// @name        Not Book
// @namespace   Stanscripts
// @description Block T Appointments
// @include     */provider/providercontrol.jsp*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + dd + '-' + mm;


var mydate = document.getElementsByClassName('dateAppointment');
var canbook = $(mydate).text().indexOf(today)
//alert(canbook)

if(canbook == -1){
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
  var onclickvalue = mytag[i].getAttribute('onclick')
}
var myclass = document.getElementsByClassName('adhour');
//alert(myclass.length)
for (var i = 0; i < myclass.length; i++) {
  var onclickvalue = myclass[i].getAttribute('title')
  if($(myclass[i]).parent().next('td').attr('title')=="Telehealth"){
      $(myclass[i]).attr("disabled", true);
      $(myclass[i]).click(function(){ alert("Online booking only - PLEASE DO NOT BOOK BY PHONE") });
      //$(myclass[i]).css('background-color', 'yellow');
      $(myclass[i]).removeAttr('onclick');
  }
}
}
