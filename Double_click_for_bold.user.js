// ==UserScript==
// @name        Double click to bold 
// @namespace   stanscript
// @description Double click to bold document label
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @include     *dms/MultiPageDocDisplay.jsp?segmentID*
// @include     *dms/showDocument.jsp*
// @version     15.1
// @grant       none
// ==/UserScript==

//alert()
function myFunction(content){ 
newstring =   "<b>"+$("input[name='documentDescription']").val()+"</b>"
$("input[name='documentDescription']").val(newstring)
}

$("input[name='documentDescription']").css("background-color","lightyellow");
$("input[name='documentDescription']").dblclick(myFunction)
