// ==UserScript==
// @name     Prefs
// @version  15.1
// @include *provider/providerpreference.jsp*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant    none
// ==/UserScript==

//========Get Path============
var elements = (window.location.pathname.split('/', 2))
firstElement = (elements.slice(1) )
vPath = ("https://" + location.host + "/"  + firstElement + "/")
//*****************************************************************
//=====Get Parameters============
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}
//alert(params.time)
//****************************

$('input[name=\'every_min\']').css('background-color', 'yellow');
$('input[name=\'every_min\']').focus()
//alert($('input[name=\'every_min\']').val())
$('input[name=\'every_min\']').val(params.time)

if(params.time){
setTimeout(function(){ 
$('body > form:nth-child(1) > div:nth-child(3) > input:nth-child(1)').click()
}, 500);
}
