// ==UserScript==
// @name        Invoice0 Screen
// @namespace   Stanscripts
// @description Create multiline statements
// @include     *billing/CA/BC/billStatus.jsp?lastName=*
// @version   15.1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @include     *billing/CA/BC/billStatus.jsp*
// @grant       none
// ==/UserScript==
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1))
vPath = ('https://' + location.hostname + '/' + firstElement)
var input = document.createElement('input');
input.type = 'button';
input.value = 'Create Statement';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;top:30px;right:100px; ');
document.body.appendChild(input);
function showAlert() {
  var GetInv = prompt('Enter invoice numbers separated by commas', '');
  var elements = GetInv.split(',')
  var mybillinglines = 'billing_no='  //alert(elements.length)
  for (m = 0; m < elements.length; m++) {
    if (m < elements.length - 1) {
      mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + '&hide=1' + '&billing_no='
    } 
    else {
      mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + '&hide=1' + '&'
    }
  }
  myPath = (vPath + '/billing/CA/BC/billingView.do?' + mybillinglines + 'receipt=yes')
  window.open(myPath)
}
