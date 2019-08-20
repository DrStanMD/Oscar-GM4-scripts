// ==UserScript==
// @name           Set Tickler Default SendTo
// @namespace      StansScripts
// @description Sets the default for Tickler SendTo, hyperlink to document, autotickler
// @include        */tickler/ticklerAdd.jsp*
// @include        *tickler/ForwardDemographicTickler.do*
// @version 15.2
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')//=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}//alert(params.docType)

var theDefault = 'Hurwitz, Office';
var theOptions = document.getElementsByName('task_assigned_to') [0].options;
for (var theOption of theOptions)
{
  if (typeof (theOption) == 'object') {
    if (theOption.text == theDefault) {
      theOption.selected = true;
      break;
    }
  }
}/*
if (params.docType) {
  var input4 = document.createElement('input');
  input4.type = 'button';
  input4.value = 'Add Hyperlink';
  input4.onclick = showAlert4;
  input4.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:0px; ');
  document.body.appendChild(input4);
}
function showAlert4()
{
  if (params.docType == 'HL7') {
    myDocLink = vPath + 'lab/CA/ALL/labDisplay.jsp?&segmentID=' + params.docId + '&providerNo=1'
  }
  if (params.docType == 'DOC') {
    myDocLink = vPath + 'dms/ManageDocument.do?method=display&doc_no=' + params.docId
  }
  myDocLink2 = '<a href=\'' + myDocLink + '\' nowrap target=\'_blank\', \'scrollbars=yes\' >DoC</a>;'
  myText = $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val()
  textpad = 52 - myText.length
  if (textpad < 0) {
    textpad = 0
  }
  //alert(textpad)

  myText = myText + Array(textpad).join('.')
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val(myText + myDocLink2)
}
*/

var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Advise Appointment';
input4.onclick = showAlert4;
input4.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:0px; ');
document.body.appendChild(input4);
function showAlert4()
{
  var theDefault = 'Normal';
  var theOptions = document.getElementsByName('priority') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
  x = document.getElementsByName('textarea') 
  $(x[0]).val('Please advise patient about appointment.')
  var theDefault = 'Hurwitz, Office';
  var theOptions = document.getElementsByName('task_assigned_to') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
}
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Pap Recall';
input3.onclick = showAlert3;
input3.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:180px; ');
document.body.appendChild(input3);
function showAlert3()
{
  var theDefault = 'Normal';
  var theOptions = document.getElementsByName('priority') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
    x = document.getElementsByName('textarea') 
    $(x[0]).val($(x[0]).val() + ' PAP RECALL. ')
 // $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('PAP RECALL')
  var theDefault = 'Hurwitz, Office';
  var theOptions = document.getElementsByName('task_assigned_to') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
}
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'CDM TBD';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:300px; ');
document.body.appendChild(input1);
function showAlert1()
{
  var theDefault = 'Normal';
  var theOptions = document.getElementsByName('priority') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
  /*
  var d = new Date();
  var n = d.getFullYear();
  // alert(n)
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)').val(n + '-01-02');
  //  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)').css('background-color', 'yellow');
  */
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
     x = document.getElementsByName('textarea') 
    $(x[0]).val('Recall for booked CDM')
 // $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('CDM TBD')
  var theDefault = 'Hurwitz, Office';
  var theOptions = document.getElementsByName('task_assigned_to') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
}
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Assign to Stan';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:400px; ');
input2.style.background='yellow'
document.body.appendChild(input2);
function showAlert2()
{
  var theDefault = 'High';
  var theOptions = document.getElementsByName('priority') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
  //$('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  x = document.getElementsByName('textarea') 
  $(x[0]).val($(x[0]).val() + ' Stan to ')
  var theDefault = 'Hurwitz, Stanley D';
  var theOptions = document.getElementsByName('task_assigned_to') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
}

var input20 = document.createElement('input');
input20.type = 'button';
input20.value = 'Prepayment';
input20.onclick = showAlert20;
input20.setAttribute('style', 'font-size:16px;position:fixed;top:18px;right:550px;');
document.body.appendChild(input20);
function showAlert20()
{
  var theDefault = 'Normal';
  var theOptions = document.getElementsByName('priority') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
 x = document.getElementsByName('textarea') 
  $(x[0]).val('Stan Awaiting Prepayment')
  var theDefault = 'Hurwitz, Stanley D';
  var theOptions = document.getElementsByName('task_assigned_to') [0].options;
  for (var theOption of theOptions)
  {
    if (typeof (theOption) == 'object') {
      if (theOption.text == theDefault) {
        theOption.selected = true;
        break;
      }
    }
  }
}

setTimeout(function () {
  $('textarea[name=\'textarea\']').focus()
}, 300);
