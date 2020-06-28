// ==UserScript==
// @name        Github downloader
// @namespace   Stanscript
// @include     *DrStanMD/Oscar-GM4-scripts*
// @include     *DrStanMD/GM4-Snippets*
// @include     *github.com/login*
// @version     15.3
// @description Download multiple files from Github
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
//****************************************************
/*
var myclass2 = document.getElementsByClassName=("js-navigation-item")
alert(myclass2.length)
for(i=0;i<myclass2.length;i++){
$(myclass2[i]).css('background-color', 'yellow')
  alert($(myclass2[i]).html())
}

*/



$('#login_field').val('sdhurwitz@gmail.com')
$('#password').val('')


var myclass = document.getElementsByClassName('js-navigation-open');
var vPath = 'https://github.com/DrStanMD/Oscar-GM4-scripts/raw/master/'
var myArray = [
]
var myFArray = [
]
for (var i = 0; i < myclass.length; i++) {
  var onclickvalue = myclass[i].getAttribute('title')
  if (myclass[i].id) {
    x = '#' + myclass[i].id
    myArray[i] = x
    var radioBtn = $('<input type=\'checkbox\' class=\'mycheckbox\'   id= ' + onclickvalue + ' value =' + onclickvalue + '>');
    $(x).before(radioBtn)
  }
}

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'IMPORT SCRIPTS';
input1.onclick = ButtonFunction1;
input1.setAttribute('style', 'font-size:18px;position:fixed;top:200px;left:10px;');
document.body.appendChild(input1);
function ButtonFunction1() {
  var myclass2 = document.getElementsByClassName('mycheckbox');
  for (var i = 0; i < myclass2.length; i++) {
    if (myclass2[i].checked) {
      // alert(myclass2[i].value)
      window.open(vPath + myclass2[i].value)
    }
  }
}

var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Check all';
input2.onclick = ButtonFunction2;
input2.setAttribute('style', 'font-size:12px;position:fixed;top:130px;left:10px;');
document.body.appendChild(input2);
function ButtonFunction2() {
  var myclass2 = document.getElementsByClassName('mycheckbox');
  for (var i = 0; i < myclass2.length; i++) {
    myclass2[i].checked = true
  }
}

var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Uncheck all';
input3.onclick = ButtonFunction3;
input3.setAttribute('style', 'font-size:12px;position:fixed;top:160px;left:10px;');
document.body.appendChild(input3);
function ButtonFunction3() {
  var myclass2 = document.getElementsByClassName('mycheckbox');
  for (var i = 0; i < myclass2.length; i++) {
    myclass2[i].checked = false
  }
}


$(document).ready(function(){
for (i = 0; i < 200; i++) {
  xx = 'tr.js-navigation-item:nth-child(' + i + ') > td:nth-child(2)'
  //x = 'tr.js-navigation-item:nth-child(' + i + ') > td:nth-child(4) > span:nth-child(1) > time-ago:nth-child(1)'
  x = 'div.Box-row:nth-child(' + i + ') > div:nth-child(4) > time-ago:nth-child(1)'
  y = $(x).html() + 'X'  //
  //alert(y)
  //alert(y.indexOf("month"))
  if (y.indexOf('hour') > - 1) {
    $(x).css('background-color', 'yellow')
    $(xx).css('background-color', 'yellow')
  }
    if (y.indexOf('day') > - 1) {
    $(x).css('background-color', 'pink')
    $(xx).css('background-color', 'pink')
  }
    if (y.indexOf('minute') > - 1) {
    $(x).css('background-color', 'lightgreen')
    $(xx).css('background-color', 'lightgreen')
  }
}

});
