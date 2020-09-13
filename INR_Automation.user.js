// ==UserScript==
// @name        INR Automation
// @namespace   Stanscript
// @include  *oscarMeasurements/SetupMeasurements.do?groupName=INR*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==

//=====Get Parameters============
//vPath = '../'
var params = {};
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

var y = ($('.note > td:nth-child(3)').html())
$('input[name=\'value(inputValue-0)\']').val(y)

str = params.instructions.replace(/%20/g, ' ');
//alert(str)
$("input[name='value(comments-0)']").val(str);
