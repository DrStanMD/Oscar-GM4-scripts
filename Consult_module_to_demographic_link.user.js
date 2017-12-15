// ==UserScript==
// @name        Consult module to demographic link
// @namespace   Stanscript
// @description Button that opens demographic link
// @include     *oscarEncounter/oscarConsultationRequest/ConsultationFormRequest.jsp*
// @include     *oscarEncounter/ViewRequest.do?*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
//alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/')
var params = {
};
if (location.search) {
  var parts = location.search.substring(1) .split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
DemoNo = params.de
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Open Demographic';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:5px;right:10px;');
document.body.appendChild(input1);
function ButtonFunction1() {
  mypath = vPath + 'demographic/demographiccontrol.jsp?demographic_no=' + DemoNo + '&displaymode=edit&dboperation=search_detail'
  myWindow = window.open(mypath, '_blank', 'width=700, height=500');
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Close Demographic';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:12px;position:fixed;top:30px;right:10px;');
document.body.appendChild(input2);
function ButtonFunction2() {
  myWindow.close();
}

//var x = document.getElementsByClassName("tite4");
//alert($(x).html())
