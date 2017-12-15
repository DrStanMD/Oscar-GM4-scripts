// ==UserScript==
// @name        Fax Ucantalk
// @namespace   Stanscript
// @include     *ucantalk.net/index.php3?ts=*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
$('body > font:nth-child(1) > form:nth-child(6) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > font:nth-child(1) > input:nth-child(1)').css('background-color', 'yellow');


$('body > font:nth-child(1) > form:nth-child(6) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > font:nth-child(1) > input:nth-child(1)').dblclick(myinput)
function myinput() {
  var person = prompt('Please enter the fax number');
  faxtext = 'ncfax=1' + person + '@fax.ucantalk.net'
  $('body > font:nth-child(1) > form:nth-child(6) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > font:nth-child(1) > input:nth-child(1)').val(faxtext)
}
