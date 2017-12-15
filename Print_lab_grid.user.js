// ==UserScript==
// @name        Print lab grid

// @namespace   StansScripts



// @description Print button for lab grid
// @include     *lab/CumulativeLabValues*

// @version     1

// @grant       none
// ==/UserScript==

var input=document.createElement("input");
input.type="button";
input.value="Print";
input.onclick = showAlert;
input.setAttribute("style", "font-size:18px;position:absolute;top:420px;right:30px;");
document.body.appendChild(input); 

function showAlert()
{window.print()}

