// ==UserScript==
// @name        Update Service Specialists Button
// @namespace   stanscript
// @include     *oscarEncounter/ShowAllServices.do?serviceId*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
var input = document.createElement('input');
input.type = 'button';
input.value = 'UPDATE';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:12px;z-index:1;position:fixed;top:150px;left:0px; ');
document.body.appendChild(input);
function showAlert() {
document.forms["EctConDisplayServiceForm"].submit();
}
