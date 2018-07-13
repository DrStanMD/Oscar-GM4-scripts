// ==UserScript==
// @name        Echart button - Print for Audit - Disabled
// @namespace   Stanscripts
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
var formID = '414'
var mylink = 'eform/efmshowform_data.jsp?fid=' + formID
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')
var myParam = location.search.split('demographicNo=') [1]
var res = myParam.indexOf('&')
var demo_no = myParam.substring(0, res)
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'AUTO-EXPAND';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:16px;position:fixed;top:0px;right:400px;');
document.body.appendChild(input1);
function ButtonFunction1() {
  $('#encMainDiv').scrollTop(0);
  $('#save > div:nth-child(3) > button:nth-child(4)').click();
  $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'red');
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'orange');
  }, 1000);
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'lavender');
  }, 1500);
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'pink');
  }, 2000);
  setTimeout(function () {
    $('#encMainDiv').scrollTop(0);
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'red');
  }, 2500);
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'orange');
  }, 3500);
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'pink');
  }, 4000);
  setTimeout(function () {
    $('#save > div:nth-child(3) > button:nth-child(4)').click();
    $('#save > div:nth-child(3) > button:nth-child(4)').css('background-color', 'lavender');
  }, 4500);
}//*************************************************************

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Print for Audit';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:16px;z-index:1;position:fixed;top:0px;right:250px; ');
document.body.appendChild(input1);
function showAlert1()
{
  //*****************print toilet roll***************
  //var lablist = window.open('', '_blank', 'width=800, scrollbars=yes, resizable=yes');
  //lablist.document.body.innerHTML = $(' #encMainDiv').html()
  var data = $('#encMainDiv').html()
  var data = encodeURIComponent(data)
  localStorage.setItem('mydata', data);
  //myWindow.close()
  myWindow = window.open(vPath + mylink, '_blank', 'width=800, scrollbars=yes, resizable=yes')  //*************************************************
}
