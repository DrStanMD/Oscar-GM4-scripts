// ==UserScript==
// @name        Stickynote
// @namespace   Stanscripts
// @description checks for stickynote
// @include     *provider/providercontrol.jsp?*
// @include     *oscarMessenger/CreateMessage.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
var mymsgId = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'oscarMessenger/DisplayMessages.do'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText
      alert(str)
      var str = xmlhttp.responseText.replace(/\s/g, '')      //alert(str)
      //alert(str.indexOf("StickyNote", str.indexOf("StickyNote")+2));
      if (str.indexOf('StickyNote') > - 1) {
        var x = str.indexOf('StickyNote') //alert(x)
        str = str.slice(x - 60) //alert(str)
        var start = str.indexOf('messageID=')
        var end = str.indexOf('&boxType')
        mymsgId = str.substring(start + 10, end)
        if (confirm('New incoming StickyNote.  Read Now?')) {
          //var myWindow = window.open(newURL, '', 'toolbar=no,menubar=no,dialog=no,width=800,height=600');
          var myWindow = window.open(vPath + 'oscarMessenger/ViewMessage.do?messageID=' + mymsgId, '', 'toolbar=no,menubar=no,dialog=no,width=800,height=600');
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
xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', vPath + 'oscarMessenger/ViewMessage.do?messageID=' + mymsgId, false);
xmlhttp.send();
var str2 = xmlhttp.responseText.replace(/\s/g, '')//alert(str2)
var y = str2.indexOf('textareaid="msgBody"name="Message"')
str2 = str2.slice(y + 79)
var z = str2.indexOf('</textarea><br>')
alert(str2.slice(0, z))//newWindow = window.open(vPath+'eform/efmshowform_data.jsp?fid=430', '', 'toolbar=no,menubar=no,dialog=no,width=400,height=200,top=0, left=0')
setInterval(function () {
  //getMeasures('X');
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
