// ==UserScript==
// @name        Invoice1 Screen
// @namespace   Stanscripts
// @description Create multiline statements,Highlight flags
// @include     *billing/CA/BC/billStatus.jsp?lastName=*
// @include     *billing/CA/BC/billStatus.jsp*

// @include     *billing/CA/BC/billing*
// @include     */billing/CA/BC/UpdateBilling*
// @version   15.1
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

//alert()

localStorage.setItem('srows1', '');
localStorage.setItem('srows2', '');
localStorage.setItem('srows3', '');
localStorage.setItem('carryforward', '')
var k = 0
var j = 0
var q = ''
var i = 0
var mytag = ''
var invoiceArray = [
];
var substringArray = [
]
var rows1 = [
]
var rows2 = [
]
var rows3 = [
] //var rowCount = $('#table> tbody > tr').length;
var rowCount = $('.table > tbody:nth-child(2) > tr').length;
//alert(rowCount)
for (p = 0; p < rowCount + 1; p++) {
  //$('.table > tbody:nth-child(2) > tr:nth-child('+p+') > td:nth-child(1)').css('background-color', 'yellow')
  //$('.table > tbody:nth-child(2) > tr:nth-child('+p+')').css('background-color', 'yellow')
  rows1[p] = $('.table > tbody:nth-child(2) > tr:nth-child(' + p + ') > td:nth-child(1)').text().trim()
  rows2[p] = $('.table > tbody:nth-child(2) > tr:nth-child(' + p + ') > td:nth-child(3)').text().trim()
  rows3[p] = $('.table > tbody:nth-child(2) > tr:nth-child(' + p + ') > td:nth-child(10)').text().trim() 
  //alert(rows1[p] + '---' + rows2[p] + '---' + rows3[p])
  //rows1[p] = ($(document.getElementById('table-1').rows[p].cells.item(0)).text()).trim()
  //rows2[p] = (document.getElementById('table-1').rows[p].cells.item(2).innerHTML).trim()
  //rows3[p] = (document.getElementById('table-1').rows[p].cells.item(10).innerHTML).trim()
  localStorage.setItem('srows1', JSON.stringify(rows1));
  localStorage.setItem('srows2', JSON.stringify(rows2));
  localStorage.setItem('srows3', JSON.stringify(rows3));
}
this.onblur = function () {
  window.localStorage.removeItem('storedparams');
  window.localStorage.removeItem('storedparams2');
}
function myXML(invoiceNo) {
  var measureArray = [
  ];
  var measureDateArray = [
  ];
  var place1 = ''
  var place2 = ''
  xmlhttp = new XMLHttpRequest();
  var pathArray = window.location.pathname.split('/');
  var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/billing/CA/BC/billingView.do?billing_no=' + invoiceNo + '&receipt=yes'
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var str = xmlhttp.responseText; //local variable
      str = str.replace(/ /g, '');
      if (!str) {
        return;
      }
      var myRe = /#Invoices#/g;
      var myRe2 = /##/g;
      var myArray;
      var i = 0;
      while ((myArray = myRe.exec(str)) !== null) {
        measureArray[i] = myArray[1];
        place1 = str.indexOf('#Invoices#')
        i = i + 1;
      }
      while ((myArray = myRe2.exec(str)) !== null) {
        measureDateArray[i] = myArray[1];
        place2 = str.indexOf('##') //alert(str.substring(place1 + 4, place2))
        substringArray[k] = str.substring(place1 + 10, place2)
        elements = substringArray[k].split(',')
        mytag[j].style.backgroundColor = 'pink';
        var mybillinglines = 'billing_no='
        for (m = 0; m < elements.length; m++) {
          if (m < elements.length - 1) {
            q = (rows1.indexOf(elements[m]))
            mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + rows2[q] + '&hide=1' + '&billing_no='
          } 
          else {
            mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + rows2[q] + '&hide=1' + '&'
          }
        }
        mytag[j].href = 'javascript:popupPage(800,800,%20\'../../../billing/CA/BC/billingView.do?' + mybillinglines + 'receipt=yes\')'
        mybillinglines = ''
        k = k + 1
        i = i + 1;
      }
    }
  }
  xmlhttp.open('GET', newURL, false);
  xmlhttp.send();
}
mytag = document.getElementsByTagName('a');
for (j = 0; j < mytag.length; j++) {
  var hrefvalue = mytag[j].getAttribute('href')
  if (hrefvalue !== null && hrefvalue.indexOf('&receipt=yes') > - 1) {
    place1 = hrefvalue.indexOf('?billing_no=')
    place2 = hrefvalue.indexOf('&receipt=yes')
    myInvoiceNo = hrefvalue.substring(place1 + 12, place2)
    invoiceArray[j] = hrefvalue
    myXML(myInvoiceNo)
  }
}
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
  var mybillinglines = 'billing_no=' //alert(elements.length)
  for (m = 0; m < elements.length; m++) {
    if (m < elements.length - 1) {
      q = (rows1.indexOf(elements[m]))
      mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + rows2[q] + '&hide=1' + '&billing_no='
    } 
    else {
      mybillinglines = mybillinglines + elements[m] + '&invoiceDate=' + rows2[q] + '&hide=1' + '&'
    }
  }
  myPath = (vPath + '/billing/CA/BC/billingView.do?' + mybillinglines + 'receipt=yes')
  window.open(myPath)
}
