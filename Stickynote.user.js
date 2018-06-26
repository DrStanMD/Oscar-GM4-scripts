// ==UserScript==
// @name        Stickynote
// @namespace   Stanscripts
// @description checks for stickynote
// @include     *provider/providercontrol.jsp?*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
//var myParam = location.search.split('demographicNo=') [1]
//var res = myParam.indexOf('&')
//var demo_no = myParam.substring(0, res)
var demoArray = [
  'CellPhone',
  'Email',
  'Phone(H)',
  'Address',
  'City',
  'Postal',
  'Age',
  'HealthIns.#'
]
var demoArrayVal = [
]
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = "https://secure10.junoemr.com/SDHurwitzInc/oscarMessenger/DisplayMessages.do?providerNo=1&userName=Stanley+D+Hurwitz"
  //var newURL = vPath + 'oscarMessenger/DisplayMessages.do' 
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var x = "$('.MainTableRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > a:nth-child(1)')"
      alert(xmlhttp.responseText)
      var str = xmlhttp.responseText.replace(/\s/g, '')
      if (!str) {
        return;
      }
      var myReString = '<li><spanclass="label">' + measure + ':</span><spanclass="info">.*/s*'
      var myRe = new RegExp(myReString, 'g');
      var myArray
      while ((myArray = myRe.exec(str)) !== null) {
        y = myArray.toString() // alert(y)
        var z = y.indexOf('info')
        var mycode = y.substring(z + 6)
        var mycode2 = mycode.indexOf('</span>')
        var mycode3 = mycode.substring(mycode + 9, mycode2) //alert(j+measure + ' is ' + mycode3)
        demoArrayVal[j] = mycode3
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
getMeasures("X")
/*
$(document).ready(function () {
  getMeasures)}
  //for (j = 0; j < demoArray.length; j++) {
   // getMeasures(demoArray[j]);
  //}
*/