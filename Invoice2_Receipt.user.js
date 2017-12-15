// ==UserScript==
// @name       Invoice2/Receipt Print notes
// @namespace   Stanscript
// @include     *billing/CA/BC/billing*
// @include     */billing/CA/BC/UpdateBilling*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     3
// @grant       none
// ==/UserScript==
if (!rows1) {
  rows1 = [
  ]
  rows2 = [
  ]
  rows3 = [
  ]
}
var paramshide = {
};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    paramshide[nv[0]] = nv[1] || true;
  }
}
var rows1 = JSON.parse(localStorage.getItem('srows1'));
var rows2 = JSON.parse(localStorage.getItem('srows2'));
var rows3 = JSON.parse(localStorage.getItem('srows3'));
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.host + '/' + firstElement + '/')
if (paramshide.hide == 1) { //Is this a new invoice?
  var input1 = document.createElement('input');
  input1.type = 'button';
  input1.value = 'Print Date of Service';
  input1.onclick = ButtonFunction1;
  input1.setAttribute('style', 'font-size:12px;position:absolute;top:70px;right:200px;');
  input1.setAttribute('class', 'header');
  document.body.appendChild(input1);
}
function ButtonFunction1() {
  PrintDOS()
}
var balanceArray = [
]
var params = [
]
var nv = [
]
var params2 = [
]
var mysave = ''
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    nv = parts[i].split('=');
    if (!nv[0]) continue;
    if (nv[0] == 'billing_no') {
      params[i] = nv[1]
    }
  }
  var params = params.filter(function (x) {
    return (x !== (undefined || ''));
  });
}
//***************************************   
//alert(params)

subtotal = 0
for (p = 0; p < params.length; p++) {
  x = params[p]
  y = rows1.indexOf(x)
  if (y > - 1) {
    z = Number(rows3[y].replace('$', ''))
    subtotal = subtotal + z
  }
}
localStorage.setItem('ssubtotal', subtotal)
//**************************************  
if (location.search) {
  var parts = location.search.substring(1).split('&');
  j = 1
  for (var i = 0; i < parts.length; i++) {
    nv = parts[i].split('=');
    if (!nv[0]) continue;
    if (nv[0] == 'invoiceDate') {
      params2[j] = nv[1]
      j = j + 1
    }
  }
}
if (params.length > 1) {
  mysave = '#Invoices#' + params + '##'
  // alert(mysave)
  var y = $('textarea[name=\'messageNotes\']').val()
  // alert(y.indexOf(mysave));
  if (y.indexOf(mysave) == - 1) {
    var r = confirm('Do you want to update this group of invoices? Click on Invoice Update Button to save the changes.');
    if (r == true) {
      $('textarea[name=\'messageNotes\']').val(mysave)
      $('input.header:nth-child(1)').css('background-color', 'red');
       $('input.header:nth-child(1)').click();
    }
  }
}
if (params.length == 0) {
  storedparams = JSON.parse(localStorage.getItem('sparams'));
  storedparams2 = JSON.parse(localStorage.getItem('sparams2'))
  params = storedparams
  params2 = storedparams2
} 
else {
  localStorage.setItem('sparams', JSON.stringify(params));
  localStorage.setItem('sparams2', JSON.stringify(params2));
}
function PrintDOS() {
  var x = document.getElementsByClassName('rcvPayment');
  $(x).addClass('address').removeClass('rcvPayment')
  mytag = document.getElementsByTagName('a');
  //alert(mytag.length)
  for (j = 0; j < mytag.length; j++) {
    var hrefvalue = mytag[j].getAttribute('onclick')
    //alert(hrefvalue)
    if (hrefvalue !== null && hrefvalue.indexOf('lineNo') > - 1) {
      if (params2[j]) {
        $(mytag[j]).text('Date of Service')
        $(mytag[j]).after('--' + params2[j])
        // $(mytag[j]).append('--' + params2[j])
      }
    }
  }
}
function myFunction() {
  y.css('background-color', 'white');
  y.addClass('header').removeClass('address')
  if (myCheckbox.checked == true) {
    y.css('background-color', 'lightyellow');
    y.addClass('address').removeClass('header')
  }
}
var y = $('textarea[name=\'messageNotes\']');
//y.val(y.val()+"\nTESTING")
//y.after('<input type="checkbox" name="myCheckbox" id="myCheckbox" size="10" />');
y.after($(document.createElement('input')).attr({
  id: 'myCheckbox',
  name: 'myCheckbox',
  value: 'myValue',
  type: 'checkbox',
  class: 'header'
})
);
myCheckbox.onchange = myFunction
y.after('<label for=\'myCheckbox\' class=\'header\'  >Print Note</label>')
