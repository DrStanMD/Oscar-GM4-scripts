// ==UserScript==
// @name         New Userscript
// @namespace    Stanscript
// @version      0.1
// @description  MS Edge dymo printer
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @author       You
// @match        http://labelwriter.com/software/dls/sdk/samples/js/PrintMeThatLabel/pl.html*
// @grant        none
// ==/UserScript==
function myfunction(){
setTimeout(function(){
    document.getElementById("printButton").style.backgroundColor = "red";
    window.open('', '_self', '');
    window.close();
}, 3000);
}
document.getElementById("printButton").addEventListener("click", myfunction,true);
document.getElementById("printButton").innerHTML="PRINT AND CLOSE";
document.getElementById("labelTextArea").rows="8";
document.getElementById("labelTextArea").cols = "150";
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
    document.getElementById("labelTextArea").value=decodeURIComponent(params.mydata);
}

var input1 = document.createElement('input');
input1.type = 'button';
input1.value = 'Reprint';
input1.onclick = showAlert1;
input1.setAttribute('style', 'font-size:40px;z-index:1;position:fixed;top:200px;right:200px; ');
document.body.appendChild(input1);

function showAlert1()
{
    $('#printButton').css('background-color', 'yellow');
    $('#printButton').click();
    window.location.reload();

}

var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Clear';
input2.onclick = showAlert2;
input2.setAttribute('style', 'font-size:40px;z-index:1;position:fixed;top:260px;right:180px; ');
document.body.appendChild(input2);
function showAlert2(){
    document.getElementById("labelTextArea").value="";
}
