// ==UserScript==
// @name        Stickynote
// @namespace   Stanscripts
// @description checks for stickynote
// @include     *provider/providercontrol.jsp?*
// @include     *oscarMessenger/CreateMessage.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==
//var sound = document.getElementById("audio");
//sound.play();
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
var vbeep = 0
var indexes = [
]
var newWindow = [
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
function beep() {
  var snd = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
  snd.play();
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
function closeWindows() {
  //alert(indexes.length)
  //for (i = 0; i < indexes.length; i++) {
  for (i = 0; i < newWindow.length; i++) {
    newWindow[i].close()
  }
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
      //alert(measure)
      newWindow[measure] = window.open(vPath + 'eform/efmshowform_data.jsp?fid=' + myformID + '&mdata='
      + mydata + '&msgID=' + mymsgId + '&mymsg=' + mymsgdate + '&mbeep=' + vbeep, 'MsgWindow' + measure, 'status=0,toolbar=no,menubar=no,dialog=no,width=400,height=200,left=0, top=' + parseInt(measure) * 30)
      setCookie('windowname', 'MsgWindow' + measure, 3600, 'path=/');
      if (measure == 0) {
        if (getCookie('firstMsgDate') !== mymsgdate) {
          setCookie('firstMsgDate', mymsgdate, 3600, 'path=/');
          //vbeep = 1          
          beep()          //alert("NEW STICKYLABEL")
          //newWindow[measure].close()
          setCookie('firstMsgDate', mymsgdate, 3600, 'path=/');
          closeWindows()
          for (q = indexes.length - 1; q > - 1; q--) {
            getMeasures(q)
          }
          vbeep = 0
          getMeasures(0);
        }
        setCookie('firstMsgDate', mymsgdate, 3600, 'path=/');
      } //alert(getCookie('firstMsgDate'))

    }
  }
} //***************************************************************************

getMeasures()
for (q = indexes.length - 1; q > - 1; q--) {
  getMeasures(q)
}
if (newWindow[0]) {
  //newWindow[0].close()
}
getMeasures(0);
setInterval(function () {
  getMeasures(0);
}, 10000);
