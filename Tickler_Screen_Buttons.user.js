// ==UserScript==
// @name        Tickler Screen Buttons
// @namespace   Stanscripts
// @description Places Add, Delete, Complete buttons at top of screen, Echart link, high highlight
// @include     *tickler/ticklerMain.jsp*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     2.0
// @grant       GM_log
// ==/UserScript==
//this.$ = this.jQuery = jQuery.noConflict(true);
window.resizeTo(1280, 780);
// http://stackoverflow.com/questions/12146445/jquery-in-greasemonkey-1-0-conflicts-with-websites-using-jquery
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
var input = document.createElement('input');
input.type = 'button';
input.value = 'Add Tickler';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:600px;');
document.body.appendChild(input);
function showAlert() {
  window.open(vPath + 'tickler/ticklerAdd.jsp')
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Complete';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:520px;');
document.body.appendChild(input1);
function showAlert1() {
  document.forms['ticklerform'].submit_form.value = 'Complete';
  document.forms['ticklerform'].submit();
  value = 'Complete';
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Delete';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:460px;');
document.body.appendChild(input2);
function showAlert2() {
  document.forms['ticklerform'].submit_form.value = 'Delete';
  document.forms['ticklerform'].submit();
  value = 'Delete';
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Cancel';
input3.onclick = showAlert3;
input3.setAttribute('style', 'font-size:12px;position:fixed;top:28px;right:400px;');
document.body.appendChild(input3);
function showAlert3() {
  window.close()
}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
var today = yyyy + '-' + mm + '-' + dd;
ClassArray = [
  'whiteRed',
  'white',
  'lilacRed',
  'lilac'
]
function highP(myclass) {
  var myhigh = ''
  myP = document.getElementsByClassName(myclass)
  for (var i = 0; i < myP.length; i++) {
    if (myP[i].innerHTML == 'High' && myP[i].innerHTML.indexOf('appointment') > - 1) {
      for (ii = 1; ii < 11; ii++) {
        myP[i - 10 + ii].style.backgroundColor = 'orange';
      }
    }
    if (myP[i]) {
      // alert(myP[i].innerHTML)
      if (myP[i].innerHTML == 'High') {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 7 + ii].style.backgroundColor = 'yellow';
        }
      }
      if (myP[i].innerHTML.indexOf('appointment') > - 1 || myP[i].innerHTML.indexOf('APPOINTMENT') > - 1 || myP[i].innerHTML.indexOf('APPT') > - 1) {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 10 + ii].style.backgroundColor = 'lightgreen';
        }
      }
      if (myP[i].innerHTML.indexOf('payment') > - 1 || myP[i].innerHTML.indexOf('Payment') > - 1 || myP[i].innerHTML.indexOf('PAYMENT') > - 1) {
        for (ii = 1; ii < 11; ii++) {
          myP[i - 10 + ii].style.backgroundColor = 'pink';
        }
      }
    }
  }
}
for (var j = 0; j < ClassArray.length; j++) {
  highP(ClassArray[j])
}
var mytag = document.getElementsByTagName('a');
for (var i = 0; i < mytag.length; i++) {
  var onclickvalue = mytag[i].getAttribute('onclick') /*
  if (onclickvalue !== null && onclickvalue.indexOf('tickler_no') > - 1) {
    var inserttag = mytag[i]
  }
  */
  if (onclickvalue !== null && onclickvalue.indexOf('demographic_no') > - 1) {
    var pstart = onclickvalue.search('demographic_no')
    var pend = onclickvalue.search('&displaymode=')
    IdNum = onclickvalue.substring(pstart + 15, pend).toString()
    var myLink = '<span><a target=/_blank/ href=' + vPath + 'oscarEncounter/IncomingEncounter.do?providerNo=999998&amp;appointmentNo=&amp;demographicNo=' + IdNum + '&amp;curProviderNo=&amp;reason=Tel-Progress+Notes&amp;encType=&amp;curDate=' + today + '&amp;appointmentDate=&amp;startTime=&amp;status=\');return false;\'>...Echart </a>'
    $(mytag[i]).after(myLink);
  }
}
