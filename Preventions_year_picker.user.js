// ==UserScript==
// @name        Preventions year picker
// @namespace   stanscript
// @description Lists years
// @include     *oscarPrevention/AddPreventionData.jsp*
// @version     2
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
//=====Get Parameters============
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
//Open Set Next Date

unsafeWindow.showHideNextDate('nextDateDiv', 'nextDate', 'nexerWarn')
if (params.myparam2) {
  //  alert(params.myparam1)
  //  alert(params.myparam2)
  var oneDay = 24 * 60 * 60 * 1000;
  var d = new Date()
  d.setTime(d.getTime() + (params.myparam2 * oneDay))
  d = new Date(d)
  //alert(d)
  //var d = new Date();
  var month = new Array();
  month[0] = 'Jan';
  month[1] = 'Feb';
  month[2] = 'Mar';
  month[3] = 'Apr';
  month[4] = 'May';
  month[5] = 'Jun';
  month[6] = 'Jul';
  month[7] = 'Aug';
  month[8] = 'Sep';
  month[9] = 'Oct';
  month[10] = 'Nov';
  month[11] = 'Dec';
  //var mm = month[d.getMonth()];
  var mm = d.getMonth() + 1
  var yy = d.getFullYear();
  var dd = d.getUTCDate();
  var FUDate = yy + '-' + mm + '-' + dd
  document.getElementById('nextDate').value = FUDate
}
//***********************************************************************************

var d = new Date();
var n = d.getFullYear();
var myYears = [
]
for (i = 0; i < 50; i++) {
  myYears[i] = n - i 
}
function myFunction() {
  var x = document.createElement('SELECT');
  x.setAttribute('id', 'mySelect');
  x.setAttribute('style', 'width:60px;font-size:16px;position:fixed;top:50px;left:50px; ');
  for (i = 0; i < 50; i++) {
    document.body.appendChild(x);
    var z = document.createElement('option');
    z.setAttribute('value', myYears[i]);
    var t = document.createTextNode(myYears[i]);
    z.appendChild(t);
    z.onclick = showalert
    document.getElementById('mySelect').appendChild(z);
  }
}
myFunction()
document.getElementById('mySelect').size = '17';
function showalert() {
  var x = document.getElementById('mySelect').value;
  $('#prevDate').val(x + '-11-01')
}
//AUTO FLU SHOT
if (params.flushot) {
  var x = document.getElementById('mySelect').value;
  $('#prevDate').val(x + '-11-01')
  setTimeout(function () {
  //  $('.MainTableRightColumn > form:nth-child(1) > input:nth-child(7)').click();
  }, 500);
}
