// ==UserScript==
// @name        Expand Click
// @namespace   Stanscript
// @include     *casemgmt/forward.jsp?action*
// @version     1
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==



//========Buttons============

var input1=document.createElement("input");
input1.type="button";
input1.value="AUTO-EXPAND";
input1.onclick = ButtonFunction1;
input1.setAttribute("style", "font-size:12px;position:fixed;bottom:0px;left:120px;");
document.body.appendChild(input1); 
function ButtonFunction1(){
 
$('#encMainDiv').scrollTop(0);
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","red");

  setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","orange");
                       }, 1000);
  
    setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","lavender");
                       }, 1500);
  
 setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","pink");
                       }, 2000);

  setTimeout(function(){
$('#encMainDiv').scrollTop(0);
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","red");
                       }, 2500);
  
    setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","orange");
                       }, 3500);
  
 setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","pink");
                       }, 4000);
setTimeout(function(){
$("#save > div:nth-child(3) > button:nth-child(4)").click();
$("#save > div:nth-child(3) > button:nth-child(4)").css("background-color","lavender");
                       }, 4500);

}
//*************************************************************
