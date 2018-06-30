// ==UserScript==
// @name        Stickynote
// @namespace   Stanscripts
// @description checks for stickynote
// @include     *provider/providercontrol.jsp?*
// @include     *oscarMessenger/CreateMessage.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
var myformID = 430 //<<<YOUR FORM id GOES HERE
//**********************************************
if (window.location.pathname.indexOf('oscarMessenger/CreateMessage') > - 1) {
  var input4 = document.createElement('input');
  input4.type = 'button';
  input4.value = 'StickyNote';
  input4.onclick = showAlert4;
  input4.setAttribute('style', 'font-size:16px;position:fixed;top:40px;left:500px; ');
  document.body.appendChild(input4);
}
function showAlert4()
{
  document.getElementsByName('subject') [0].value = 'StickyNote'
  document.getElementsByName('tblDFR2') [2].click() //this could [0] or [1] or [?] depending on send group
  //document.getElementsByName('tblDFR2') [1].click()
  document.getElementsByName('message') [0].focus();
} //**********************************************

var mylink = ($('#navlist > li:nth-child(7) > a:nth-child(1)').attr('onclick')).toString() //alert(mylink)
var x = mylink.indexOf('popupOscarRx')
mylink = mylink.slice(x + 26, - 1)
var mymsgId = ''
var indexes = [
]
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
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
}
function getAllIndexes(arr, val) {
  indexes = [
  ]
  i = - 1;
  while ((i = arr.indexOf(val, i + 1)) != - 1) {
    indexes.push(i);
  }
  return indexes;
}
function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + mylink
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText //alert(str)
      var str = xmlhttp.responseText.replace(/\s/g, '')
      var indexes = getAllIndexes(str, 'StickyNote');
      // alert(indexes)
      if (str.indexOf('StickyNote') > - 1) {
        //var x = str.indexOf('StickyNote')
        var x = indexes[measure]
        str = str.slice(x - 60) //alert(str)
        var start = str.indexOf('messageID=')
        var end = str.indexOf('&boxType')
        mymsgId = str.substring(start + 10, end) //alert(mymsgId)
        /* 
        if (confirm('New incoming StickyNote.  Read Now?')) {
          //var myWindow = window.open(newURL, '', 'toolbar=no,menubar=no,dialog=no,width=800,height=600');
          var myWindow = window.open(vPath + 'oscarMessenger/ViewMessage.do?messageID=' + mymsgId, '', 'toolbar=no,menubar=no,dialog=no,width=800,height=600');
        } else {
          //   txt = "You pressed Cancel!";
        }
      */
      }
      if (!str) {
        return;
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', vPath + 'oscarMessenger/ViewMessage.do?messageID=' + mymsgId, false);
  xmlhttp.send();
  var str2 = xmlhttp.responseText //.replace(/\s/g, '')
  //alert(str2)
  var y = str2.indexOf('textarea id="msgBody" name="Message"')
  str2 = str2.slice(y + 93) // alert(str2)
  var z = str2.indexOf('</textarea><br>') //alert(str2.slice(0, z))
  mydata = encodeURIComponent(str2.slice(0, z)) //
  if (mydata !== 'null') {
    newWindow = window.open(vPath + 'eform/efmshowform_data.jsp?fid=' + myformID + '&mdata='
    + mydata + '&msgID=' + mymsgId, 'MsgWindow' + measure, 'toolbar=no,menubar=no,dialog=no,width=400,height=200,left=0, top=' + measure + 10)
    setCookie('windowname', 'MsgWindow' + measure, 360, 'path=/');
  }
}

getMeasures(0)
newWindow.close()//alert(indexes.length)
for (q = indexes.length - 1; q > - 1; q--) {
  //alert(q)
  getMeasures(q)  //alert(getCookie('windowname'))
}
setInterval(function () {
getMeasures('0');
}, 30000);
