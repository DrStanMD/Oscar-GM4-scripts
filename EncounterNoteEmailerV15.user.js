// ==UserScript==
// @name        EncounterNoteEmailerV15
// @namespace   http://dev.drbillylin.com/oscarwiki
// @description	Puts ENEngine-enabled Email and Text Buttons on the Encounter Note page
// @include     */casemgmt/forward.jsp?action=view*
// @version     15.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require     emailtextengine_V15.js
// @require     emailtextengine_credentials_V15.js
// @require     mandrill_nostringify_V15.js

// ==/UserScript==
// @require    xxxxxxxxxxxxxx=emailtextengine_V15.js
// @require     xxxxxxxxxxx=emailtextengine.js
// @require     xxxxxxxxx=emailtextengine_credentials.js
// @require     xxxxxxxxxxxxxxx=emailtextengine_credentials_V15.js
// @require     xxxxxxxxxxxxx=mandrill_nostringify.js
// @require     xxxxxxxxxxxxx=mandrill_nostringify_V15.js

// @require     emailtextengine_V15.js
// @require     xxxxxxxxxxxxxxxxx?imagefile=emailtextengine_credentials.js
// READ ME
// 1. emailtextengine.js IS REQUIRED IN THE OSCAR IMAGE DIRECTORY FOR THE EMAIL AND TEXT BUTTONS TO WORK
// 2. Do NOT change the first chunk of code that puts emailtextengine.js in the <head> section
// 3. Use "EmailButton", "TextButton", and "ConsentButton" as the ID's for the 3 buttons
// THIS PUTS THE emailtextengine.js IMAGE IN THE <HEAD> SECTION, WHICH ALLOWS FOR THE sendEmail(subject, body), sendText(body), and openForm() FUNCTIONS

/*
  var head = document.getElementsByTagName('head') [0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  var pathArray = window.location.pathname.split('/');
  var newURL = window.location.protocol + '//' + window.location.host + '/' + pathArray[1] + '/eform/displayImage.do?imagefile=emailtextengine_V15.js';
  //window.open(newURL)
  script.src = newURL;
  head.appendChild(script);

  var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/displayImage.do?imagefile=mandrill_nostringify.js";
  var mandrill_script = document.createElement('script');
  mandrill_script.type = 'text/javascript';
  mandrill_script.src = newURL; 
  head.appendChild(mandrill_script);

  newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/displayImage.do?imagefile=emailtextengine_credentials.js";
  var credential = document.createElement('script');
  credential.type = 'text/javascript';
  credential.src = newURL;
  head.appendChild(credential);
*/


function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  //d.setTime(d.getTime()+(exdays*24*60*60*1000));
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath
  //setCookie('email', qqemail, 360, 'path=/');
}
function getCookie(cname)
{
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}


if (getCookie("mypatientCell")){
  patientCell = getCookie("mypatientCell")
  //alert(patientCell)
}
setCookie('mypatientCell', "", 360, 'path=/');

$(document).ready(function(){
 // setCookie('mypatientCell', "wrong", 360, 'path=/');
 // window.addEventListener('load', function () {
    // You should keep most of the code for the buttons the way they are
    var emailButton = document.createElement('input');
    emailButton.type = 'button';
    emailButton.value = 'Email';
    emailButton.id = 'EmailButton';
    emailButton.name = 'EmailButton';
    emailButton.onclick = function () {
      var message = document.getElementById('MessageBox').value;
      sendEmail('Email from your Family Doctor', message);
      //document.getElementsByTagName("textarea")[1].value += '\nEmail sent to patient:\n'+message;
    };
    var textButton = document.createElement('input');
    textButton.type = 'button';
    textButton.value = 'Text';
    textButton.id = 'TextButton';
    textButton.name = 'TextButton';
    textButton.onclick = function () {
      var message = document.getElementById('MessageBox').value;
      //alert(message)
      sendText(message);
      //document.getElementsByTagName("textarea")[1].value += '\nText sent to patient:\n'+message;
    };
    var consentButton = document.createElement('input');
    consentButton.type = 'button';
    consentButton.value = 'Update Consent';
    consentButton.id = 'ConsentButton';
    consentButton.name = 'ConsentButton';
    consentButton.onclick = function () {
      openConsentForm();
    };
    var textArea = document.createElement('textarea');
    textArea.id = 'MessageBox';
    textArea.value = 'Message to email or text';
    textArea.setAttribute('cols', '30');
    textArea.setAttribute('rows', '10');
    textArea.onclick = function () {
      this.value = '';
    };
    // This is where the buttons are going on the webpage
    //var destination = document.getElementById("rightNavBar");"encounterHeader
    var destination = document.getElementById('leftNavBar');
    destination.appendChild(textArea);
    destination.appendChild(emailButton);
    destination.appendChild(textButton);
    destination.appendChild(consentButton);
//  }, false);

});
