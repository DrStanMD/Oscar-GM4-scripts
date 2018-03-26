// ==UserScript==
// @name        Edit Tickler Screen Button
// @namespace   Stanscripts
// @description Add 1, 2 and 3 month recall buttons to Ticklers
// @include     */tickler/ticklerEdit.jsp?*
// @include      *tickler/ForwardDemographicTickler.do?docType=*
                 
// @version     1
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ('https://' + location.hostname + '/' + firstElement + '/')
//alert(vPath)
//var myWindow = window.open("","","width=200,height=100");
var input = document.createElement('input');
input.type = 'button';
input.value = 'Today';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:16px;position:fixed;bottom:0px;right:165px;');
document.body.appendChild(input);
function showAlert()
{
  unsafeWindow.addMonth(0)
}
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = '1 month';
input4.onclick = showAlert4;
input4.setAttribute('style', 'font-size:16px;position:fixed;bottom:0px;right:235px;');
document.body.appendChild(input4);
function showAlert4()
{
  unsafeWindow.addMonth(1)
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = '2 month';
input1.onclick = showAlert2;
input1.setAttribute('style', 'font-size:16px;position:fixed;bottom:0px;right:320px;');
document.body.appendChild(input1);
function showAlert2()
{
  unsafeWindow.addMonth(2)
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = '3 month';
input2.onclick = showAlert3;
input2.setAttribute('style', 'font-size:16px;position:fixed;bottom:0px;right:405px;');
document.body.appendChild(input2);
function showAlert3()
{
  unsafeWindow.addMonth(3)
}
