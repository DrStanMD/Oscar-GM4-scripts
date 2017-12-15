// ==UserScript==
// @name        INR automation
// @namespace   Stanscript
// @include     https://secure10.oscarhost.ca/SDHurwitzInc/oscarEncounter/oscarMeasurements/SetupMeasurements.do?groupName=INR%20Management
// @version     1
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @grant       none
// ==/UserScript==
yy = $('.note > td:nth-child(3)').html()
$('input[name=\'value(inputValue-0)\']').val(yy);
vINR = 'https://secure10.oscarhost.ca/SDHurwitzInc/oscarEncounter/oscarMeasurements/SetupDisplayHistory.do?type=INR'
INRwindow = window.open(vINR, '_blank', 'toolbar=yes, scrollbars=yes, resizable=yes, top=250, left=200, width=900, height=600');


