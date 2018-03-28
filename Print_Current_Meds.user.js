// ==UserScript==
// @name        Print Current Meds
// @namespace   Stanscripts
// @description Very large button to print current medications (eases locum frustration)
// @include     *oscarRx/choosePatient.do?*
// @version     1
// @grant       none
// ==/UserScript==

var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
vPath = ("https://" + location.hostname + "/"  + firstElement + "/")

//var myWindow = window.open("","","width=200,height=100");

var input=document.createElement("input");
input.type="button";
input.value="Print Medication List";
input.onclick = showAlert;
input.setAttribute("style", "font-size:20px;position:fixed;top:0px;right:0px;");
document.body.appendChild(input); 
function showAlert()
{
 // $('.DivContentSectionHead > a:nth-child(1)').click()
myWindow =  window.open(vPath + "/oscarRx/PrintDrugProfile2.jsp","","width=800,height=600")
                     
}
