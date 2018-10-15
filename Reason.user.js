// ==UserScript==
// @name        Reason Replace
// @namespace   Stanscript
// @include     *providercontrol.jsp?year*
// @description Replaces Reason-for-visit to the line below. Adds Wait Time button
// @version     15.1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1)) //alert(firstElement)
vPath = ('https://' + location.host + '/' + firstElement + '/') //alert(vPath)
var greenline1 = 'HereonTime'
var greenline2 = 'HerebutLate'
var mybtcolor = ''
var arrivetime = ''
var diff = ''
function TimeColorSort() {
}
function DateCalc(vad, vah, vam, vi) {
  var dtD = Date.parse(vad);
  var dtM = (parseInt(vah) * 60 + parseInt(vam))
  var d = new Date();
  var dh = d.getHours() * 60
  var dm = d.getMinutes()
  var vnow = dh + dm
  diff = (vnow - dtM)
  if (diff < 6) {
    mybtcolor = '#00ee00'
  }
  if (diff > 5) {
    mybtcolor = 'lightgreen'
  }
  if (diff > 10) {
    mybtcolor = 'Orange'
  }
  if (diff > 15) {
    mybtcolor = 'OrangeRed'
  }
  if (diff > 20) {
    mybtcolor = 'Red'
  }
  if (str.indexOf('provider_no=1&') > - 1) { //to exclude this provider number
    // mybtcolor = '#00ee00'
  }
}
function Arrive() {
  var x = document.getElementsByClassName('appt');
  for (i = 0; i < x.length; i++) {
    str = x[i].innerHTML.replace(/\s+/g, '');
    if (str !== null && (str.indexOf(greenline1) > - 1 || str.indexOf(greenline2) > - 1)) { //green lines
      //  alert(dt)
      if (str !== null && str.indexOf('appointment_no') > - 1 && str.indexOf('&amp;provider_') > - 1) {
        //alert(str)
        var pstart = str.search('appointment_no')
        var pend = str.search('&amp;provider_')
        var AppNo = str.substring(pstart + 15, pend).toString()
      }
      var arrivetime = ''
      xmlhttp = new XMLHttpRequest();
      var pathArray = window.location.pathname.split('/');
      var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/appointment/appointmentcontrol.jsp?appointment_no=' + AppNo + '&displaymode=edit&dboperation=search'
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var str = xmlhttp.responseText; //local variable
          if (!str) {
            return;
          }
          str = str.replace(/\s+/g, '');
          var myRe = /lastcreatedatetime/g
          var ad = str.substring(str.search(myRe) + 34, str.search(myRe) + 44)
          var ah = str.substring(str.search(myRe) + 44, str.search(myRe) + 46)
          var as = str.substring(str.search(myRe) + 47, str.search(myRe) + 49)
          arrivetime = str.substring(str.search(myRe) + 44, str.search(myRe) + 49)
          if (arrivetime.indexOf('=') > - 1) {
            arrivetime = ' '
          }
          if (arrivetime) {
            DateCalc(ad, ah, as, i)
          }
        }
      }
      xmlhttp.open('GET', newURL, false);
      xmlhttp.send();
      $(x[i]).prepend('&nbsp; <button type=\'button\' id=\'OTB\'>' + diff + ' min' + '</button>')
      $(document.getElementById('OTB')).css('background-color', mybtcolor);
      //  $(document.getElementById('OTB')).css('font-size', '80%');
      $(document.getElementById('OTB')).attr('id', 'OTB' + i);
      var element = $(document.getElementById('OTB' + i))
      document.getElementById('OTB' + i).addEventListener('click', function () {
        //alert(this.id)
      });
    }
  }
  TimeColorSort()
} //-----------------------------------------------------------------------------------------

$(document.getElementById('expandReason')).after('&nbsp; <button type=\'button\' id=\'button0\' >Reason</button><button type=\'button\' id=\'button2\' >WaitTime</button><button type=\'button\' id=\'button3\' >S-Note</button><button type=\'button\' id=\'button1\' style="background-color: lime;">Reload</button>')
document.getElementById('button0').addEventListener('click', function () {
  var x = document.getElementsByClassName('appt');
  for (i = 0; i < x.length; i++) {
    yy = (x[i].innerHTML)
    //alert(yy)
    zz = (yy.indexOf('Reason'))
    oldstring = (yy.substring(0, zz - 10))
    newstring = yy.substring(zz+31)
    //alert(newstring)
    $(x[i]).html(oldstring)
    $(x[i]).append('<br>' + newstring)
  }
})
document.getElementById('button3').addEventListener('click', function () {
  window.open(vPath + '/oscarMessenger/CreateMessage.jsp')
})
document.getElementById('button1').addEventListener('click', function () {
  location.reload();
})
document.getElementById('button2').addEventListener('click', function () {
  Arrive();
})
