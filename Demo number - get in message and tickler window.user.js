// ==UserScript==
// @name        Demo number - get in message and tickler window
// @namespace   Stanscripts
// @description gets demo number from message and  tickler window
// @include     *oscarMessenger/CreateMessage.jsp*
// @include     *ForwardDemographicTickler*
// @include     *oscarMessenger*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @grant       none
// ==/UserScript==

//alert(window.name)
//alert(window.opener.name)

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

if (localStorage.getItem("tickler_close") == "yes") {
    localStorage.setItem("DemoNo", "")
    localStorage.setItem("DemoNo", params.demographic_no); //2022-Dec-13 saves demonumber for Reminders
    localStorage.setItem("DemoNo", params.demographic_no); //2022-Dec-13 saves demonumber
    //alert(localStorage.getItem("DemoNo"))
    window.close()
    localStorage.setItem("tickler_close", "no")
}

var input = document.createElement('input');
input.type = 'button';
input.id = "input"
input.value = 'Message to Patient requesting URGENT call back';
input.onclick = showAlert;
input.setAttribute('style', 'font-size:18px;position:fixed;top:50px;left:600px;');
document.body.appendChild(input);
document.getElementById('input').style.backgroundColor = 'pink';


function showAlert() {
var mymsg = "I have advised the patient that the doctor is not available to return your call today. \n\nI have advised to attend Urgent Care or ER today if this an urgent medical problem or emergency.\n\nIf this is non-urgent condition, patient should self-book online appointment.\n\nReason why patient called:"
document.getElementsByName('subject')[0].value = "Patient called today requesting URGENT call back"
document.getElementsByName('message')[0].value = mymsg
}