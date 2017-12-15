// ==UserScript==
// @name        Print Label
// @namespace  StansScripts

// @description Set your own specific defaults for Oscar's native labels 
// @include   *demographic/demographiclabelprintsetting.jsp*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
 
var input=document.createElement("input");
input.type="button";
input.value="Set Print Label Default Values";
input.onclick = showAlert;
input.setAttribute("style", "font-size:18px;position:absolute;bottom:auto;right:30px;");
document.body.appendChild(input); 
 
function showAlert()
{
  document.labelprint.label1no.value="1";
  document.labelprint.label1checkbox.checked=false;
  document.labelprint.label2checkbox.checked=false;
  document.labelprint.label3checkbox.checked=false;
    document.labelprint.label4checkbox.checked=false;
      document.labelprint.label5checkbox.checked=true;
  document.labelprint.label5no.value="5";
  document.labelprint.label3no.value="0";
  document.labelprint.left.value = "200";
  document.labelprint.top.value = "40";
  document.labelprint.height.value = "85";
  document.labelprint.gap.value = "22"; 
//document.labelprint.copytext5.style = "font-weight: bold"
//$("#copytext5").css("background-color","yellow");
//$("#copytext5").css("font-weight", "bold");
//$("#copytext5").css("font-size", "large");

}
  
//style="  font-family: Arial, Helvetica, sans-serif; "font-size", "large"; font-weight: normal; font-style: normal">


