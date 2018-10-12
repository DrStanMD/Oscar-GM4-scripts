// ==UserScript==
// @name           Set Tickler Default Assign To
// @namespace      StansScripts
// @include        *tickler/ticklerMain.jsp*
// @description Sets Tickler Default Assign To
// version 15.1
// ==/UserScript==

var theDefault = 'Hurwitz , Stanley D';
//var theDefault='Ghobassy , Bahar';
//var theDefault='Ho , Wei-Ning';
//var theDefault='Winkler , Daniella';
var theOptions = document.getElementsByName('assignedTo') [0].options;
for (var theOption of theOptions)
{
  if (typeof (theOption) == 'object') {
    //alert(theOption.text)
    if (theOption.text == theDefault) {
      theOption.selected = true;
      break;
    }
  }
}

//$('.mbttn').click()
/*
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
*/
