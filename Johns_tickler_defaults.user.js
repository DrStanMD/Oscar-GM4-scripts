// ==UserScript==
// @name           Tickler Set Default, SendTo, Tasks
// @namespace      StansScripts
// @description Sets the default for Tickler SendTo, quick pick tasks
// @include        */tickler/ticklerAdd.jsp*
// @include        *tickler/ForwardDemographicTickler.do*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     15.0
// ==/UserScript==
//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/') //=====Get Parameters============
var params = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
var theDefault = 'MOA, MOA';
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
var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'CDM TBD';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:285px;color:green;');
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Book for complex care/DM CPx')
var theDefault = 'MOA, MOA';
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
input2.value = 'Call TCI';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:390px;color:green;');
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('TCI re: ')
var theDefault = 'MOA, MOA';
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
input3.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:175px;color:green;');
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Due for Pap')
var theDefault = 'MOA, MOA';
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
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Advise Appointment';
input4.onclick = showAlert4;
input4.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:0px;color:green;');
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Please advise patient about appointment.')
var theDefault = 'MOA, MOA';
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
var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'Call INR';
input5.onclick = showAlert5;
input5.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:480px;color:green;');
document.body.appendChild(input5);
function showAlert5()
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Call INR')
var theDefault = 'MOA, MOA';
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
var input6 = document.createElement('input');
input6.type = 'button';
input6.value = 'ER report';
input6.onclick = showAlert6;
input6.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:665px;color:green;');
document.body.appendChild(input6);
function showAlert6()
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Get ER report: ')
var theDefault = 'MOA, MOA';
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
var input7 = document.createElement('input');
input7.type = 'button';
input7.value = 'Call Msg';
input7.onclick = showAlert7;
input7.setAttribute('style', 'font-size:14px;position:fixed;top:18px;right:570px;color:green;');
document.body.appendChild(input7);
function showAlert7()
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
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(4) > td:nth-child(2) > font:nth-child(1) > select:nth-child(1)').css('background-color', 'yellow');
  $('body > table:nth-child(3) > tbody:nth-child(4) > tr:nth-child(5) > td:nth-child(2) > textarea:nth-child(1)').val('Call Msg re: ')
var theDefault = 'MOA, MOA';
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
