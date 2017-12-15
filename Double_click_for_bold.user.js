// ==UserScript==
// @name        Double click to bold 
// @namespace   stanscript
// @description Double click to bold document label
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include     *dms/MultiPageDocDisplay.jsp?segmentID*
// @include     *dms/showDocument.jsp?inWindow*
// @version     1
// @grant       none
// ==/UserScript==


function myFunction(content){ 
newstring =   "<b>"+$("input[name='documentDescription']").val()+"</b>"
$("input[name='documentDescription']").val(newstring)
}

$("input[name='documentDescription']").css("background-color","lightyellow");
$("input[name='documentDescription']").dblclick(myFunction)