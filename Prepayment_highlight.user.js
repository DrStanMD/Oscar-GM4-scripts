// ==UserScript==
// @name       Receipt screen - Prepayment highlight
// @namespace   Stanscript
// @include     *billing/CA/BC/billing*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     2
// @grant       none
// ==/UserScript==
var x = document.getElementsByClassName('billTo');
//alert(x)
for (i = 0; i < x.length; i++) {
  yy = x[i].value
  //  alert(yy)
  if (yy.indexOf('payment') > - 1) {
    $(x[i]).css('background-color', 'yellow');
  }
  if (yy.indexOf('PAYMENT') > - 1) {
    $(x[i]).css('background-color', 'yellow');
  }
}
//------------------------------------------------------
/*
function myFunction() {
  y.css('background-color', 'white');
  y.addClass('header').removeClass('address')
  if (myCheckbox.checked == true) {
    y.css('background-color', 'lightyellow');
    y.addClass('address').removeClass('header')
  }
}
var y = $('textarea[name=\'messageNotes\']');
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
y.after('<label for=\'myCheckbox\' class=\'header\'  >Print Text</label>')
*/