// ==UserScript==
// @name        EncounterNoteEmailer_V15
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

function setCookie(cname, cvalue, exdays, cpath)
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 5000));
  var expires = 'expires=' + d.toGMTString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; ' + cpath  //setCookie('email', qqemail, 360, 'path=/');
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
if (getCookie('mypatientCell')!="") {
  patientCell = getCookie('mypatientCell')  //alert(patientCell)
}
setCookie('mypatientCell', "", 360, 'path=/');
$(document).ready(function () {
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
  textArea.setAttribute('rows', '5');
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
