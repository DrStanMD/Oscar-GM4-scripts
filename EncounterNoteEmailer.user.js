// ==UserScript==
// @name        EncounterNoteEmailer
// @namespace   http://dev.drbillylin.com/oscarwiki
// @description	Puts ENEngine-enabled Email and Text Buttons on the Encounter Note page
// @include     */casemgmt/forward.jsp?action=view*
// @version     1.21
// @grant       none
// @updateURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/EncounterNoteEmailer.meta.js
// @downloadURL	https://github.com/linbilly/EmailTextEngine/raw/master/GreaseMonkey/EncounterNoteEmailer.user.js
// ==/UserScript==

// READ ME
// 1. emailtextengine.js IS REQUIRED IN THE OSCAR IMAGE DIRECTORY FOR THE EMAIL AND TEXT BUTTONS TO WORK
// 2. Do NOT change the first chunk of code that puts emailtextengine.js in the <head> section
// 3. Use "EmailButton", "TextButton", and "ConsentButton" as the ID's for the 3 buttons

// THIS PUTS THE emailtextengine.js IMAGE IN THE <HEAD> SECTION, WHICH ALLOWS FOR THE sendEmail(subject, body), sendText(body), and openForm() FUNCTIONS
var head = document.getElementsByTagName("head")[0];
var script = document.createElement('script');
script.type = 'text/javascript';
var pathArray = window.location.pathname.split( '/' );
var newURL = window.location.protocol + "//" + window.location.host +"/"+pathArray[1]+"/eform/displayImage.do?imagefile=emailtextengine.js";
script.src = newURL; 
head.appendChild(script);

window.addEventListener("load",function(){

	// You should keep most of the code for the buttons the way they are
	var emailButton = document.createElement("input");
	emailButton.type = "button";
	emailButton.value = "Email";
	emailButton.id = "EmailButton";
	emailButton.name = "EmailButton";
	emailButton.onclick = function(){
		var message = document.getElementById("MessageBox").value;
		sendEmail("Email from your Family Doctor", message);
		//document.getElementsByTagName("textarea")[1].value += '\nEmail sent to patient:\n'+message;
	};

	var textButton = document.createElement("input");
	textButton.type = "button";
	textButton.value = "Text";
	textButton.id = "TextButton";
	textButton.name = "TextButton";
	textButton.onclick = function(){
		var message = document.getElementById("MessageBox").value;
		sendText(message);
		//document.getElementsByTagName("textarea")[1].value += '\nText sent to patient:\n'+message;
	};

	var consentButton = document.createElement("input");
	consentButton.type = "button";
	consentButton.value = "Update Consent";
	consentButton.id = "ConsentButton";
	consentButton.name = "ConsentButton";
	consentButton.onclick = function(){
		openConsentForm();
	};
	
	var textArea = document.createElement("textarea");
	textArea.id = "MessageBox";
	textArea.value = "Message to email or text";
	textArea.setAttribute("cols", "30");
	textArea.setAttribute("rows", "10");
	textArea.onclick = function(){this.value="";};

	// This is where the buttons are going on the webpage
	var destination = document.getElementById("rightNavBar");
	destination.appendChild(textArea);
	destination.appendChild(emailButton);
	destination.appendChild(textButton);
	destination.appendChild(consentButton);

}, false);
