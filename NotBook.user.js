// ==UserScript==
// @name        Not Book
// @namespace   Stanscripts
// @description Block T-slots
// @include     */provider/providercontrol.jsp*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
//alert(today)
var mydate = $(document.getElementsByClassName('dateAppointment')).text()
//alert(mydate)
var canbook = mydate.indexOf(today)
//var canbook = today.indexOf(mydate)
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
  if($(myclass[i]).parent().next('td').attr('title')=="Telehealth" || $(myclass[i]).parent().next('td').attr('title')=="NOT BOOK"){
      $(myclass[i]).attr("disabled", true);
      $(myclass[i]).click(function(){ alert("PLEASE DO NOT BOOK") });
      //$(myclass[i]).css('background-color', 'yellow');
      $(myclass[i]).removeAttr('onclick');
  }
}
}
