// ==UserScript==
// @name        Invoice3 Receive payment
// @namespace   Stanscripts
// @description REceive payments
// @include     *billing/CA/BC/viewReceivePaymentAction.do?line*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
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
var aa = 0
var qq = ''
var vcarryforward = 0
var subtotal = Number(localStorage.getItem('ssubtotal'))
// alert(subtotal)
function ButtonFunction1() {
  document.getElementById('rbalance').value = (Number(document.getElementById('payment').value) - Number($('input[name=\'amountReceived\']').val())).toFixed(2)
  if (document.getElementById('rbalance').value < 0) {
    alert('Insufficient funds - reduce invoice amount!')
    //  document.getElementById('payment').focus()
    $('input[name=\'amountReceived\']').focus()
  } 
  else {
    aa = Number(rows3[qq].replace('$', '')) - Number($('input[name=\'amountReceived\']').val())
    //**********************************
    x = Number($('input[name=\'amountReceived\']').val()).toFixed(2)
    subtotal = (subtotal - x).toFixed(2)
    correctamount = (document.getElementById('rbalance').value - subtotal)
    //alert(correctamount)
    if (correctamount > 0) {
     // alert('Amount paid exceeds the value of this invoice')
    }
    //************************************************

  }
}
this.onsubmit = function () {
  ButtonFunction1()
  x = document.getElementById('rbalance').value
  localStorage.setItem('carryforward', x);
  rows3[qq] = aa.toFixed(2)
  localStorage.setItem('srows3', JSON.stringify(rows3));
  if (x !== 0) {
    // alert('Balance of ' + x + ' carried forward')
  }
}
var input1 = document.createElement('input');
input1.type = 'text';
input1.id = 'payment';
input1.value = '';
input1.onblur = ButtonFunction1;
input1.setAttribute('style', 'font-size:14px;position:fixed;top:20px;left:120px;');
document.body.appendChild(input1)
input1.size = 5
var input2 = document.createElement('input');
input2.type = 'text';
input2.id = 'rbalance'
input2.name = 'rbalance'
input2.value = '';
input2.onblur = ButtonFunction1;
input2.setAttribute('style', 'font-size:14px;position:fixed;bottom:40px;right:30px;');
document.body.appendChild(input2)
input2.size = 5
$('#payment').after('<input  disabled size = "40" value ="Enter total payment for all lines in this invoice" style="font-size: 12px; position: fixed; top: 20px; left:180px;" id="paymentlabel" type="text">')
$('#rbalance').before('<input  disabled size = "15" value ="Carried Forward" style="font-size: 12px; position: fixed; bottom: 40px; right: 90px;" id="balancelabel" type="text">')
$('#payment').css('background-color', 'yellow');
$('#rbalance').css('background-color', 'lightgreen');
document.getElementById('rbalance').disabled = true;
vcarryforward = localStorage.getItem('carryforward')
input1.value = vcarryforward
$('input[name=\'amountReceived\']').blur(function () {
  ButtonFunction1()
})
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}
var today = yyyy + '-' + mm + '-' + dd;
q = $('input[name=\'billingmasterNo\']').val()
var rows1 = JSON.parse(localStorage.getItem('srows1'));
var rows2 = JSON.parse(localStorage.getItem('srows2'));
var rows3 = JSON.parse(localStorage.getItem('srows3'));
qq = rows1.indexOf(q)
$('input[name=\'amountReceived\']').val((rows3[qq].replace('$', '')))
$('input[name=\'paymentDate\']').val(today);
//=========Option List Default============
var theDefault = 'CHEQUE';
var theOptions = document.getElementsByName('paymentMethod') [0].options;
for (var theOption of theOptions)
{
  for (var i = 0; i < 3; i++) {
  }
  if (typeof (theOption) == 'object') {
    //alert(theOption.text)
    if (theOption.text == theDefault) {
      theOption.selected = true;
      break;
    }
  }
}
document.getElementById('payment').value = subtotal
document.getElementById('payment').focus()
