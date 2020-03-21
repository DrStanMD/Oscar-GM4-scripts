// ==UserScript==
// @name     Toggle Minutes
// @version  15.1
// @include *provider/providerpreference.jsp*
// @include     *provider/providercontrol.jsp?year*
// @include     *provider/receptionistfindprovider.jsp*
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

var input99 = document.createElement('input');
input99.id  = 'input99'
input99.type = 'button';
input99.value = '5m';
input99.onclick = showAlert99;
input99.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:485px;');
document.body.appendChild(input99);

function showAlert99() {
    window.open(vPath + '/provider/providerpreference.jsp?time='+"5")
}

var input = document.createElement('input');
input.id  = 'input'
input.type = 'button';
input.value = '15m';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;bottom:0px;right:425px;');
document.body.appendChild(input);

function showAlert() {
    window.open(vPath + '/provider/providerpreference.jsp?time='+"15")
}

$('input[name=\'every_min\']').css('background-color', 'yellow');
$('input[name=\'every_min\']').focus()
//alert($('input[name=\'every_min\']').val())
$('input[name=\'every_min\']').val(params.time)

if(params.time){
setTimeout(function(){ 
$('body > form:nth-child(1) > div:nth-child(3) > input:nth-child(1)').click()
}, 200);
}

if(window.location.pathname.indexOf('preference')>-1){
  $('#input99').hide()
  $('#input').hide()
}


