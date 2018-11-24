// ==UserScript==
// @name        Timer Suite
// @namespace   Stanscript
// @include     */casemgmt/forward.jsp?action=view&demographic*
// @description Record echart time
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
/*
Indemnity
Although reasonable care is taken to test the scripts before publishing, 
everything you see here is meant to be informational only, and should be used with caution. 
No guarantee is made or implied about the scripts here whatsoever. 
Using scripts described here may result in errant behavior in the EMR, 
inadvertently harming patients, and general badness. 
Using any parts of the code implies you fully understand the code and the risks associated with using it.
*/
//**********************************************************
var inputvar = 377 //form id goes here
//var inputvar = 252 //form id goes here
//**********************************************************
if (inputvar == 0) {
  alert('Set the specific HTML form Id for your Oscar system')
  return false
} //=======Cookie functions===========

function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
} //========Get Path============

var myWindow = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
window.onbeforeunload = reloadcookie;
function reloadcookie() {
  var y = (6 / 86400) //10 seconds
  setCookie('RELOAD', 'RELOAD', y, 'path=/') // myWindow = window.open(vPath + 'eform/efmformadd_data.jsp?fid=' + inputvar + '&demographic_no=' + params.demographicNo)
}
var input130 = document.createElement('input');
input130.type = 'button';
input130.value = 'RELOAD';
input130.id = 'input130'
input130.onclick = showAlert130;
input130.setAttribute('style', 'font-size:18px;position:fixed;z-index:1;bottom:208px;right:95px;');
document.body.appendChild(input130);
document.getElementById('input130').style.backgroundColor = 'yellow';
function showAlert130() {
  var y = (6 / 86400) //10 seconds
  setCookie('RELOAD', 'RELOAD', y, 'path=/') //alert(input202.value)
  location.reload();
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.id = 'input2'
input2.value = 'Timer';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:18px;width:95px;position:fixed;bottom:208px;right:0px;z-index:1;background-color: #d9d9d9');
document.body.appendChild(input2);
function ButtonFunction2() {
  var endtimer = input2.value
  setCookie('TTIME', endtimer, 360, 'path=/')
  input2.value = 'Timer'
  input2.style.background = '#d9d9d9' // setCookie('UNLOAD', Date(), 360, 'path=/') 
  var t = new Date();
  t.setSeconds(t.getSeconds() + 10);
  // alert(Date())
  // alert(t)
  setCookie('UNLOAD', t, 360, 'path=/')
  x = 0 //Reset timer
  
  //code to open window right bottom
    height=5;
    width=5;
    t=window.innerHeight-height
    l=window.innerWidth-width
  //******************
 myWindow = window.open(vPath + 'eform/efmformadd_data.jsp?fid=' + inputvar + '&demographic_no=' + params.demographicNo, '', 'height='+height+', width='+width+', left='+l+', top='+t );
 //myWindow = window.open(vPath + 'eform/efmformadd_data.jsp?fid=' + inputvar + '&demographic_no=' + params.demographicNo, "MsgWindow", "width=10,height=10,right=200,top=0")
} 

//===========Timer==========

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
if (!getCookie('RELOAD')) {
  var x = 0
 // alert(x)
  setCookie('LOAD', Date(), 360, 'path=/')
} 
else {
  var x = parseInt(getCookie('TIMER'))
}
mytimer = setInterval(myMethod, 1000);
var toRGB = 'set'
function myMethod()
{
  x = x + 1
  n = x.toString()
  input2.onclick = '';
  setCookie('TIMER', x, 360, 'path=/')
  input2.value = n.toHHMMSS();
  if (x > 30) {
    input2.style.background = '#FFC0CB'
    input2.onclick = ButtonFunction2;
  }
    if (x > 300) {
    input2.style.background = 'orange'
    input2.onclick = ButtonFunction2;
  }
    if (x > 600) {
    input2.style.background = 'red'
    input2.onclick = ButtonFunction2;
  }
      if (x > 900) {
    input2.style.background = 'red'
    input2.onclick = ButtonFunction2;
    blink()  
  }
}

function blink() {
if (toRGB == 'set')
{
  input2.style.background = 'white'
  toRGB = ''
} 
else
{
  input2.style.background = 'red'
  toRGB = 'set'
}

}

