// ==UserScript==
// @name        INR Automation
// @namespace   Stanscript
// @include  *oscarMeasurements/SetupMeasurements.do?groupName=INR*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version     15.1
// @grant       none
// ==/UserScript==
var y = ($('.note > td:nth-child(3)').html())
$('input[name=\'value(inputValue-0)\']').val(y)
