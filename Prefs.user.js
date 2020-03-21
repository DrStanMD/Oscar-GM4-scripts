// ==UserScript==
// @name     Prefs
// @version  15
// @include *provider/providerpreference.jsp*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant    none
// ==/UserScript==

//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
//alert(firstElement)
vPath = ("https://" + location.host + "/"  + firstElement + "/")
//alert(vPath)
//*****************************************************************

$('input[name=\'every_min\']').css('background-color', 'yellow');
$('input[name=\'every_min\']').focus()
//alert($('input[name=\'every_min\']').val())
