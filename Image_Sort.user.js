// ==UserScript==
// @name        Image Sort
// @namespace   Stanscript
// @description Sorts Images
// @include     *eform/efmimagemanager.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Sort';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:16px;position:absolute;top:0px;left:0px;');
document.body.appendChild(input2);
function showAlert2() {
  myDisplay()
}
function naturalSorter(as, bs) {
  var a,
  b,
  a1,
  b1,
  i = 0,
  n,
  L,
  rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
  if (as === bs) return 0;
  a = as.toLowerCase().match(rx);
  b = bs.toLowerCase().match(rx);
  L = a.length;
  while (i < L) {
    if (!b[i]) return 1;
    a1 = a[i],
    b1 = b[i++];
    if (a1 !== b1) {
      n = a1 - b1;
      if (!isNaN(n)) return n;
      return a1 > b1 ? 1 : - 1;
    }
  }
  return b[i] ? - 1 : 0;
}
//********************

var reA = /[^a-zA-Z]/g;
var reN = /[^0-9]/g;
function sortAlphaNum(a, b) {
  var aA = a.replace(reA, '');
  var bA = b.replace(reA, '');
  if (aA === bA) {
    var aN = parseInt(a.replace(reN, ''), 10);
    var bN = parseInt(b.replace(reN, ''), 10);
    return aN === bN ? 0 : aN > bN ? 1 : - 1;
  } else {
    return aA > bA ? 1 : - 1;
  }
}
f = $('.elements').html()
var parts = f.split('Delete</a></td>');
parts[0]=parts[0].substring(143)

var myArray = [
];
for (i = 0; i < parts[i].length + 1; i++) {
  var ii = parts[i].search('imagefile=') + 10
  var ie = parts[i].search('.')
  searchstring = ''
  while (ii < ie) {
    searchstring = searchstring + parts[i].charAt(ii)
    //alert(searchstring)
    ii = ii + 1
  }
  myArray[i] = searchstring + parts[i].trim()
  //alert(myArray[i])
}
//alert(myArray[23])
//myArray.sort(naturalSorter)

myArray.sort(sortAlphaNum)
var Newlist = ''
for (i = 0; i < myArray.length - 1; i++) {
  startat = 0
  endat = 2000
  startat = (myArray[i].indexOf('<'))
  //endat = (myArray[i].indexOf('>'))
  namestring = myArray[i].substring(0, startat)
  //alert(namestring)
  myArray[i] = '<font size = \'1\'>' + myArray[i].substring(startat, endat) + namestring + '<br>'
  Newlist = Newlist + myArray[i]
}
function myDisplay() {
  $('.elements > tbody:nth-child(1)').html(Newlist)
}
