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
var mymsgdate = ''
var indexes = [
]
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  var time = d.getTime();
  time += exdays * 1000; //   expires in 10 seconds, 3600 expires in one hour
  d.setTime(time);
  var expires = 'expires=' + d.toUTCString() //alert(expires)
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
      var str = xmlhttp.responseText.replace(/\s/g, '') //alert(str)
      var indexes = getAllIndexes(str, 'StickyNote');
      // alert(indexes)
      if (str.indexOf('StickyNote') > - 1) {
        //var x = str.indexOf('StickyNote')
        var x = indexes[measure]
        str = str.slice(x - 60) //
        //alert(str)
        var start = str.indexOf('messageID=')
        var end = str.indexOf('&boxType')
        mymsgId = str.substring(start + 10, end) //alert(mymsgId)
        var start = str.indexOf('<tdbgcolor="#EEEEFF">')
        var end = str.indexOf('</td><tdbgcolor="#EEEEFF"></td></tr>')
        mymsgdate = str.substring(start + 21, end)
        mymsgdate = mymsgdate.slice(0, 10) + ' @ ' + mymsgdate.slice(10, 15) //alert(mymsgdate)
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
  if (measure > - 1) {
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
      + mydata + '&msgID=' + mymsgId + '&mymsg=' + mymsgdate, 'MsgWindow' + measure, 'status=0,toolbar=no,menubar=no,dialog=no,width=400,height=200,left=0, top=' + parseInt(measure) * 50)
      setCookie('windowname', 'MsgWindow' + measure, 3600, 'path=/');
      setCookie('firstMsgDate', mymsgdate, 3600, 'path=/');
    }
  }
}//***************************************************************************

getMeasures()
for (q = indexes.length - 1; q > - 1; q--) {
  getMeasures(q)
}
setInterval(function () {
  getMeasures('0');
}, 10000);
