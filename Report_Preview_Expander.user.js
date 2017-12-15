// ==UserScript==
// @name        Report Preview Expander
// @namespace   Stanscript
// @description Expands Report Preview window
// @include     *dms/inboxManage.do?method=prepareForIndexPage&providerNo*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     1.1
// @grant       none
// ==/UserScript==
//=======Key Shortcuts============
/*var nextbutton = ''
window.addEventListener('keypress', function (theEvent) {
  //theEvent.stopPropagation();
  //theEvent.preventDefault();
  var theKeyCode = theEvent.charCode; // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  //var theDownKey= theEvent.PgDnKey;
  switch (true) {
    case theAltKey && theKey == 'z':
      alert(nextbutton)
      break;
  }
},
true);
*/
//**********************************************************************
formsArray = [
]
nn = 0
window.resizeTo(1300, 800);
$(document).ready(function () {
  setTimeout(function () {
    var y = document.getElementById('docViews').childNodes[1].innerHTML
    for (i = 0; i < y.length; i++) {
      if (y.indexOf('labdoc_') > - 1) {
        pstart = y.indexOf('labdoc_')
        pend = y.indexOf('name="scannedDoc" ')
        formsArray[i] = y.substring(pstart + 7, pend - 2)
        //  alert(formsArray[i])
        y = y.substring(pend + 60)
      } 
      else {
        break
      }
    }
  }, 2000);
});
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
//========Buttons============
var img = new Image();
img.src = vPath + 'eform/displayImage.do?imagefile=loading_wait.gif'
img.type = 'img';
img.value = 'IMAGE1';
img.id = 'IMAGE1';
img.setAttribute('style', 'font-size:10px;position:fixed;bottom:0px;left:0px;color:green;');
$('.MainTableTopRowRightColumn > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').append(img)
document.getElementById('IMAGE1').style.visibility = 'hidden';
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'AUTO-EXPAND';
input1.id = 'AUTO-EXPAND';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:10px;position:fixed;top:20px;left:300px;color:green;');
input1.setAttribute('title', 'for use in Preview mode');
document.body.appendChild(input1);
function ButtonFunction1() {
  for (i = 0; i < formsArray.length; i++) {
    document.getElementById('IMAGE1').style.visibility = 'visible';
    setTimeout(function () {
      $('#docViews').scrollTop(i * 20000);
      // $('#autocompletedemo' + formsArray[0]).focus()
     // $('#docViews').scrollTop(0);
      document.getElementById('IMAGE1').style.visibility = 'hidden';
    }, ((i * 500) + 800));
    if ($('#autocompletedemo' + formsArray[i]).val() == '') {
      $('#autocompletedemo' + formsArray[i]).css('background-color', 'yellow')
      document.getElementById('autocompletedemo' + formsArray[i]).title = formsArray[i];
      $('#autocompletedemo' + formsArray[i]).change(function () {
        $('#saveNext' + this.title).click()
        // alert(this.title)
        nn = ('#autocompletedemo' + (Number(this.title) - 1)).toString()
        // alert(nn)
        setTimeout(function () {
          if (!nn) {
            nn = ('#autocompletedemo' + (Number(this.title) - 1)).toString()
          } 
          else {
            $(nn).focus()
          }
        }, 1000);
      });
    } 
    else {
      //  alert('Assigned already')
    }
  }
}
