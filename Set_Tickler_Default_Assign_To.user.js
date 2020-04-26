// ==UserScript==
// @name           Set Tickler Default Assign To
// @namespace      StansScripts
// @include        *tickler/ticklerMain.jsp*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @description Sets Tickler Default Assign To
// version 15.3
// ==/UserScript==

//localStorage.clear();
$('select[name=assignedTo]').css("background-color", "lightyellow");
if (localStorage.getItem("tdefault_doc")) {
    document.getElementById("assignedTo").selectedIndex = localStorage.getItem("tdefault_doc")
} else {
    alert("The default provider is not set for this session on this computer.  \nSelect the default provider from the list, then click STORE.")
}


var input8 = document.createElement("input");
input8.type = "button";
input8.value = "Store Default Assign To";
input8.onclick = showAlert8;
input8.setAttribute("style", "font-size:12px;position:absolute;top:30px;right:80px;");
document.body.appendChild(input8);

function showAlert8() {
    var Set_Default = document.getElementById("assignedTo").selectedIndex
    localStorage.setItem("tdefault_doc", Set_Default);
    var sel = document.getElementById("assignedTo")
    var x = sel.options[sel.selectedIndex].text;
    alert(x + " is now set as the Default Assign To on this computer.")
    location.reload();
}

window.resizeTo(1400, 800);
window.moveTo(400, 100)
