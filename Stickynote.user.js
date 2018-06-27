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
setInterval(function(){ 
getMeasures('X'); }, 30000);

