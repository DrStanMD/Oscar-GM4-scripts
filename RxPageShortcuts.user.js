// ==UserScript==
// @name           RxPageShortcuts
// @namespace     StansScripts
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @description Shortcut Alt-s for save prescription without printing, Print DymoLabel for Triple Rx
// @include        *oscarRx/choosePatient.do?providerNo*
// @include        *oscarRx/Preview2.jsp?scriptId*
// @include        *Rx page.htm
// @include        *oscarRx/ViewScript2*
// ==/UserScript==

function myfunction(){
  alert("HI")
}
y = ".leftGreyLine > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > span:nth-child(1) > input:nth-child(1)"
$(y).css('background-color', 'yellow');
$(y).after("<input id='myBtn' type='button' value='Triple Rx'   >")
document.getElementById("myBtn").addEventListener("click", showAlert19); 

$('#preview').css('background-color', 'yellow');
alert($('#AutoNumber1').html())

//=========Set Cookie===============
function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
}
//===========Get Cookie==========

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
function inWords(num) {
  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '
  ];
  var b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
  ];
  var c = [
    'thousand',
    '',
    ''
  ];
  num = num.toString();
  if (num.length > 9) {
    return ''; // Number is larger than what function can deal with
  }
  num = ('000000000' + num).substr( - 9); // // Make number into a predictiable nine character string
  num = num.match(/.{3}/g); // Split string into chuncks of three numbers then reverse order of returned array
  var words = '';
  for (var i = 0; i < c.length; i++) {
    var n = num[i];
    var str = '';
    str += (words != '') ? ' ' + c[i] + ' ' : '';
    str += (n[0] != 0) ? (a[Number(n[0])] + 'hundred ')  : '';
    n = n.substr(1);
    str += (n != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n)] || b[n[0]] + ' ' + a[n[1]])  : '';
    words += str;
  }
  words = words.replace(/and undefined/g, '');
  words = words.replace(/undefined/g, '');
  return words;
};
function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
function ucFirst(string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}
//alert(ucFirst(inWords(232)))
//alert(toTitleCase(inWords(232)))
//=====Get Parameters============

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
if (params.demographicNo) {
  demoNo = params.demographicNo
  //alert(params.demographicNo)
  setCookie('CdemoNo', demoNo, 360, 'path=/')
} 
else {
  demoNo = getCookie('CdemoNo')
  //alert(demoNo)
  setCookie('CdemoNo', '', 360, 'path=/')
}
window.addEventListener('keypress', function (theEvent) {
  //theEvent.stopPropagation();
  //theEvent.preventDefault();
  var theKeyCode = theEvent.charCode; // || event.which;
  var theKey = String.fromCharCode(theKeyCode);
  var theAltKey = theEvent.altKey;
  var theCtrlKey = theEvent.ctrlKey;
  var theShiftKey = theEvent.shiftKey;
  switch (true) {
    case theAltKey && theKey == 's': //save
      updateSaveAllDrugs();
      break;
  }
},
true);
var input19 = document.createElement('input');
input19.type = 'button';
input19.value = 'Triple Rx label';
input19.onclick = showAlert19;
input19.setAttribute('style', 'font-size:16px;position:fixed;top:0px;right:0px;');
document.body.appendChild(input19);
//document.getElementById("input19").style.display = "none";
input19.className = 'noprint'
//$('.leftGreyLine > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(3) > tbody:nth-child(1)').append(input19)
function showAlert19()
{alert("HELLO2")
  //printPaste2Parent(true) 
  var rxprint = $('#pwTable > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').html()
  rxprint1 = rxprint.substring(1, rxprint.search('<hr>'))
  rxprint3 = rxprint1.replace(/<br>/g, '  ')
  qend = rxprint3.search('Repeats')
  qsplit = rxprint3.search('Qty:')
  //alert(rxprint3.split(qsplit))
  qty = rxprint3.substring(rxprint3.search('Qty:') + 4, qend - 1)
  qtyInwords = ucFirst(inWords(qty))
  rxprint3 = rxprint3.slice(0, qend)
  rxprint4 = rxprint3.replace('Qty:' + qty.toString(), 'Qty:' + qty.toString() + '(' + qtyInwords + ')  ')
  qsplit = rxprint4.search('Qty:')
  rx1 = rxprint4.slice(0, qsplit).trim()
  rx2 = rxprint4.slice(qsplit).trim()
  rxlabel = 'https://secure10.oscarhost.ca/SDHurwitzInc/eform/efmformadd_data.jsp?fid=142&demographic_no=' + demoNo + '&rxdata1=' + rx1 + '&rxdata2=' + rx2
  //alert(rxlabel)
  window.open(rxlabel)
}
