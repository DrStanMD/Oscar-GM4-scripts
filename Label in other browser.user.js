
// ==UserScript==
// @name         Label in other browser
// @namespace    Stanscript
// @version      0.1
// @description  Label in other Browser
// @author       You
// @match        http://labelwriter.com/software/dls/sdk/samples/js/PrintMeThatLabel/pl.html*
// @grant        none
// ==/UserScript==

document.getElementById("labelTextArea").rows="6"

var elements = (window.location.pathname.split('/', 2));
firstElement = (elements.slice(1));
vPath = ('https://' + location.host + '/' + firstElement + '/');
//=====Get Parameters============
var params = {};
if (location.search) {
  var parts = location.search.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var nv = parts[i].split('=');
    if (!nv[0]) continue;
    params[nv[0]] = nv[1] || true;
  }
}
if (params.mydata) {
 var newdata = decodeURIComponent(params.mydata);
document.getElementById("labelTextArea").value=newdata
}
