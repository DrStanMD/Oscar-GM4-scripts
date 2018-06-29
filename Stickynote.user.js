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
var mymsgId = ''
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //===========Cookies===============
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
} //setCookie("homephone",qqhomephone,360,"path=/");

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
} //*****************************************************************

function getMeasures(measure) {
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = vPath + 'oscarMessenger/DisplayMessages.do'
  //window.open('https://secure10.junoemr.com/SDHurwitzInc/oscarMessenger/DisplayMessages.do?providerNo=1')
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText //alert(str)
      var str = xmlhttp.responseText.replace(/\s/g, '') //alert(str.indexOf("StickyNote", str.indexOf("StickyNote")+2));
      if (str.indexOf('StickyNote') > - 1) {
        var x = str.indexOf('StickyNote') //alert(x)
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
str2 = str2.slice(y + 93) //
 // alert(str2)
var z = str2.indexOf('</textarea><br>') //alert(str2.slice(0, z))
mydata = encodeURIComponent(str2.slice(0, z)) //
 //alert(mydata)
var winExists = getCookie("windowname")
if(!winExists){
  if(mydata!=="null"){
newWindow = window.open(vPath + 'eform/efmshowform_data.jsp?fid=' + myformID + '&mdata=' + mydata + '&msgID=' + mymsgId, '', 'toolbar=no,menubar=no,dialog=no,width=400,height=200,top=0, left=0')
setCookie('windowname', 'newWindow', 360, 'path=/');
  }
}

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
