// ==UserScript==
// @name        WCB form 
// @namespace   stanscript
// @description Todays service date
// @include     *billing/CA/BC/viewformwcb.do?demographic_no*
// @include     *form/forwardshortcutname.jsp?formname=BC-WCB*
// @version     1
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('#w_diagnosis').css("background-color","yellow");
$('#w_servicedate').css("background-color","yellow");
$('#w_doi').css("background-color","pink");
var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;

$('#w_servicedate').dblclick(function(){myScript();
});

function myScript(){  
$('#w_servicedate').val(today)
}
