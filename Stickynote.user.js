// ==UserScript==
// @name        Stickynote
// @namespace   Stanscripts
// @description checks for stickynote
// @include     *provider/providercontrol.jsp?*
// @include     *oscarMessenger/CreateMessage.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
newWindow = window.open("https://secure10.junoemr.com/SDHurwitzInc/eform/efmshowform_data.jsp?fid=430", '', 'toolbar=no,menubar=no,dialog=no,width=400,height=200,top=0, left=0')
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'oscarMessenger/DisplayMessages.do'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText.replace(/\s/g, '')
      if (str.indexOf('StickyNote') > - 1) {
        if (confirm('New incoming StickyNote.  Read Now?')) {
          var myWindow = window.open(newURL, '', 'toolbar=no,menubar=no,dialog=no,width=800,height=600');
        } else {
          //   txt = "You pressed Cancel!";
        }
      }
      if (!str) {
        return;
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
getMeasures('X')
setInterval(function () {
  getMeasures('X');
}, 30000);
if (window.location.pathname.indexOf('oscarMessenger/CreateMessage') > - 1) {
  var input4 = document.createElement('input');
  input4.type = 'button';
  input4.value = 'StickyNote';
  input4.onclick = showAlert4;
  input4.setAttribute('style', 'font-size:16px;position:fixed;top:40px;right:400px; ');
  document.body.appendChild(input4);
}
function showAlert4()
{
  document.getElementsByName('subject') [0].value = 'StickyNote'
  document.getElementsByName('message') [0].focus();
  document.getElementsByName('tblDFR2') [2].checked = true
}
