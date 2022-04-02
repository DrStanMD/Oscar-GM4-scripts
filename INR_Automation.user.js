// ==UserScript==
// @name        INR Automation
// @namespace   Stanscript
// @include  *oscarMeasurements/SetupMeasurements.do?groupName=INR*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.2
// @grant       none
// ==/UserScript==

var y = ($('.note > td:nth-child(3)').html())
$('input[name=\'value(inputValue-0)\']').val(y)

/*
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
*/

//var str = params.instructions

var demoNo = $('input[name="value(demographicNo)"]').val()
//alert(demoNo)
var str = localStorage.getItem("instructions" + demoNo)
//alert(str)
if (str) {
    //str = str.replace(/%20/g, ' ');
    //alert(str)
    $("input[name='value(comments-0)']").val(str);

    setTimeout(function() {
      //localStorage.setItem("instructions" + demoNo, "")
      localStorage.removeItem("instructions" + demoNo)
    }, 5000);
    
  
}

