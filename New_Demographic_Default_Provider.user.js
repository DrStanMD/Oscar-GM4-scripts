// ==UserScript==
// @name           New Demographic Default Provider
// @namespace      StansScripts
// @description Sets default provider for New Demographic
// @include       *demographic/demographicaddrecordcustom.jsp
// @include        *demographic/demographicaddarecordhtm.jsp
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

/*  Find the value of the option list
$('body > form:nth-child(4) > div:nth-child(6) > select:nth-child(2)').find("option").each(function () {
alert($(this).val() )
})
*/

//$('body > form:nth-child(4) > div:nth-child(6) > select:nth-child(2)').css("background-color","yellow");
$('body > form:nth-child(4) > div:nth-child(6) > select:nth-child(2)').val("1");


//$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(14) > td:nth-child(2) > select:nth-child(1)').css("background-color","yellow");
$('body > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > form:nth-child(1) > table:nth-child(23) > tbody:nth-child(1) > tr:nth-child(14) > td:nth-child(2) > select:nth-child(1)').val("1")